export enum Sex {
  MALE,
  FEMALE,
}

export enum NextRelativeType {
  UP,
  DOWN,
  SAME_LAYER,
}

export abstract class NextRelative {
  constructor(
    protected _type: NextRelativeType,
    protected _sex: Sex,
  ) {}

  get type() {
    return this._type;
  }

  get sex() {
    return this._sex;
  }
}

export class UpRelative extends NextRelative {
  constructor(_sex: Sex) {
    super(NextRelativeType.UP, _sex);
  }
}

export class DownRelative extends NextRelative {
  constructor(_sex: Sex) {
    super(NextRelativeType.DOWN, _sex);
  }
}

export enum BirthOrder {
  SELF,
  OLDER,
  YOUNGER,
}

export class BirthOrderBranch extends NextRelative {
  constructor(
    _sex: Sex,
    protected _birthOrders: Set<BirthOrder>,
  ) {
    super(NextRelativeType.SAME_LAYER, _sex);
  }

  get birthOrders() {
    return this._birthOrders;
  }
}

export enum RelationIdentityType {
  SELF, // 用作我
  WIFE,
  HUSBAND,
}

export class RelationIdentity extends NextRelative {
  constructor(
    protected _identityType: RelationIdentityType,
    sex: Sex = Sex.MALE,
  ) {
    super(NextRelativeType.SAME_LAYER, sex);
    switch (_identityType) {
      case RelationIdentityType.WIFE:
        this._sex = Sex.FEMALE;
        break;
      case RelationIdentityType.HUSBAND:
        this._sex = Sex.MALE;
        break;
      default:
        break;
    }
  }

  get identityType() {
    return this._identityType;
  }
}
