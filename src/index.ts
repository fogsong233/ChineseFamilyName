import {
  NextRelative,
  NextRelativeType,
  RelationIdentity,
  RelationIdentityType,
  UpRelative,
  Sex,
  DownRelative,
  BirthOrderBranch,
  BirthOrder,
} from "./kinship-type.js";

export * from "./kinship-type.js";

import { getName, genRelativeDesc } from "./name.js";

export { getName, genRelativeDesc };

type KinshipChain = Array<NextRelative>;

export default class Kinship {
  kinshipChain: KinshipChain;
  constructor(selfSex: Sex) {
    this.kinshipChain = [
      new RelationIdentity(RelationIdentityType.SELF, selfSex),
    ];
  }

  private get chainEnd() {
    return this.kinshipChain[this.kinshipChain.length - 1];
  }

  private canRollBack(newType: NextRelativeType.DOWN | NextRelativeType.UP) {
    switch (newType) {
      case NextRelativeType.UP:
        for (let i = this.kinshipChain.length - 1; i >= 0; i--) {
          const node = this.kinshipChain[i];
          if (node.type == NextRelativeType.DOWN) {
            return true;
          } else if (
            node.type == NextRelativeType.UP ||
            (node instanceof RelationIdentity &&
              node.identityType !== RelationIdentityType.SELF)
          ) {
            return false;
          }
        }
        return false;
      case NextRelativeType.DOWN:
        for (let i = this.kinshipChain.length - 1; i >= 0; i--) {
          const node = this.kinshipChain[i];
          if (node.type == NextRelativeType.UP) {
            return true;
          } else if (
            node.type == NextRelativeType.DOWN ||
            (node instanceof RelationIdentity &&
              node.identityType !== RelationIdentityType.SELF) ||
            (node instanceof BirthOrderBranch &&
              !(
                node.birthOrders.size === 1 &&
                node.birthOrders.has(BirthOrder.SELF)
              ))
          ) {
            return false;
          }
        }
        return false;
    }
  }

  father() {
    if (this.canRollBack(NextRelativeType.UP)) {
      while (this.kinshipChain.pop()?.type !== NextRelativeType.DOWN);
      return this.husband();
    } else {
      this.kinshipChain.push(new UpRelative(Sex.MALE));
    }
    return this;
  }
  mother() {
    if (this.canRollBack(NextRelativeType.UP)) {
      while (this.kinshipChain.pop()?.type !== NextRelativeType.DOWN);
      return this.wife();
    } else {
      this.kinshipChain.push(new UpRelative(Sex.FEMALE));
    }
    return this;
  }

  son() {
    if (this.canRollBack(NextRelativeType.DOWN)) {
      while (this.kinshipChain.pop()?.type !== NextRelativeType.UP);
      // 出现分支
      const branches = [BirthOrder.OLDER, BirthOrder.YOUNGER];
      if (this.chainEnd.sex == Sex.MALE) {
        branches.push(BirthOrder.SELF);
      }
      this.kinshipChain.push(new BirthOrderBranch(Sex.MALE, new Set(branches)));
      return this;
    } else {
      this.kinshipChain.push(new DownRelative(Sex.MALE));
    }
    return this;
  }
  daughter() {
    if (this.canRollBack(NextRelativeType.DOWN)) {
      while (true) {
        const a = this.kinshipChain.pop()?.type;
        if (a === NextRelativeType.UP) break;
      }
      // 出现分支
      const branches = [BirthOrder.OLDER, BirthOrder.YOUNGER];
      if (this.chainEnd.sex == Sex.FEMALE) {
        branches.push(BirthOrder.SELF);
      }
      this.kinshipChain.push(
        new BirthOrderBranch(Sex.FEMALE, new Set(branches)),
      );
      return this;
    } else {
      this.kinshipChain.push(new DownRelative(Sex.FEMALE));
    }
    return this;
  }

  older(sex: Sex) {
    if (this.chainEnd instanceof BirthOrderBranch) {
      const branches = new Set<BirthOrder>();
      this.chainEnd.birthOrders.forEach((order) => {
        switch (order) {
          case BirthOrder.SELF:
            branches.add(BirthOrder.OLDER);
            break;
          case BirthOrder.OLDER:
            branches.add(BirthOrder.OLDER);
            break;
          case BirthOrder.YOUNGER:
            branches.add(BirthOrder.OLDER);
            branches.add(BirthOrder.YOUNGER);
            branches.add(BirthOrder.SELF);
            break;
        }
      });
      this.kinshipChain.pop();
      this.kinshipChain.push(new BirthOrderBranch(sex, branches));
    } else {
      this.kinshipChain.push(
        new BirthOrderBranch(sex, new Set([BirthOrder.OLDER])),
      );
    }
    return this;
  }
  olderSister = () => this.older(Sex.FEMALE);
  olderBrother = () => this.older(Sex.MALE);

  younger(sex: Sex) {
    if (this.chainEnd instanceof BirthOrderBranch) {
      const branches = new Set<BirthOrder>();
      this.chainEnd.birthOrders.forEach((order) => {
        switch (order) {
          case BirthOrder.SELF:
            branches.add(BirthOrder.YOUNGER);
            break;
          case BirthOrder.YOUNGER:
            branches.add(BirthOrder.YOUNGER);
            break;
          case BirthOrder.OLDER:
            branches.add(BirthOrder.OLDER);
            branches.add(BirthOrder.YOUNGER);
            branches.add(BirthOrder.SELF);
            break;
        }
      });
      this.kinshipChain.pop();
      this.kinshipChain.push(new BirthOrderBranch(sex, branches));
    } else {
      this.kinshipChain.push(
        new BirthOrderBranch(sex, new Set([BirthOrder.YOUNGER])),
      );
    }
    return this;
  }

  youngerSister = () => this.younger(Sex.FEMALE);
  youngerBrother = () => this.younger(Sex.MALE);

  wife() {
    if (this.chainEnd.sex === Sex.FEMALE) {
      return this;
    }
    if (
      this.chainEnd instanceof RelationIdentity &&
      this.chainEnd.identityType === RelationIdentityType.HUSBAND
    ) {
      this.kinshipChain.pop();
    } else if (this.chainEnd.type === NextRelativeType.UP) {
      // 如果是Up,调转性别
      this.kinshipChain.pop();
      this.kinshipChain.push(new UpRelative(Sex.FEMALE));
    } else {
      this.kinshipChain.push(new RelationIdentity(RelationIdentityType.WIFE));
    }
    return this;
  }

  husband() {
    if (this.chainEnd.sex === Sex.MALE) {
      return this;
    }
    if (
      this.chainEnd instanceof RelationIdentity &&
      this.chainEnd.identityType === RelationIdentityType.WIFE
    ) {
      this.kinshipChain.pop();
    } else if (this.chainEnd.type === NextRelativeType.UP) {
      // 如果是Up,调转性别
      this.kinshipChain.pop();
      this.kinshipChain.push(new UpRelative(Sex.MALE));
    } else {
      this.kinshipChain.push(
        new RelationIdentity(RelationIdentityType.HUSBAND),
      );
    }
    return this;
  }

  // 分离branch
  protected genBranches(): Array<KinshipChain> {
    let res: Array<KinshipChain> = [[]];
    for (const node of this.kinshipChain) {
      if (node instanceof BirthOrderBranch) {
        const befRes = res.map((v) => v.slice());
        res = [];
        for (const order of node.birthOrders) {
          const newRes = befRes.map((v) => v.slice());
          newRes.forEach((chain) => {
            if (order === BirthOrder.SELF) return;
            // 合并SameLayer,比如儿子的姐姐,是女儿,同一层的描述(兄弟姐妹),如果上一层是子女,可以合并掉
            const backNode = chain[chain.length - 1];
            if (backNode instanceof DownRelative) {
              chain.pop();
              chain.push(new DownRelative(node.sex));
            } else {
              chain.push(new BirthOrderBranch(node.sex, new Set([order])));
            }
          });
          res.push(...newRes);
        }
      } else {
        res.forEach((chain) => {
          chain.push(node);
        });
      }
    }
    return Array.from(new Set(res));
  }

  genPossibleStr() {
    return ChainStringer.stringifyAll(this.genBranches());
  }
}

export class ChainStringer {
  private static getSexCode(sex: Sex) {
    return sex === Sex.MALE ? "M" : "F";
  }

  private static genStrCode(node: NextRelative) {
    if (node instanceof UpRelative) {
      return `U_${this.getSexCode(node.sex)}`;
    } else if (node instanceof DownRelative) {
      return `D_${this.getSexCode(node.sex)}`;
    } else if (node instanceof BirthOrderBranch) {
      return `${node.birthOrders.has(BirthOrder.OLDER) ? "O" : "Y"}_${this.getSexCode(node.sex)}`;
    } else if (node instanceof RelationIdentity) {
      let preTag: string;
      switch (node.identityType) {
        case RelationIdentityType.SELF:
          preTag = "S";
          break;
        case RelationIdentityType.WIFE:
          preTag = "W";
          break;
        case RelationIdentityType.HUSBAND:
          preTag = "H";
          break;
      }
      return `${preTag}_${this.getSexCode(node.sex)}`;
    }
  }
  static stringify(chain: KinshipChain): string {
    return chain
      .map((node: NextRelative) => {
        const a = this.genStrCode(node);
        return a;
      })
      .join(" ");
  }
  static stringifyAll(chain: KinshipChain[]): Array<string> {
    return chain.map((v) => ChainStringer.stringify(v)).flat(1);
  }
}
