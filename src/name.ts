export const UnitNameLookUp = {
  S_M: "我",
  S_F: "我",
  U_M: "父亲",
  U_F: "母亲",
  D_M: "儿子",
  D_F: "女儿",
  Y_M: "弟弟",
  Y_F: "妹妹",
  O_M: "哥哥",
  O_F: "姐姐",
  W_F: "妻子",
  H_M: "丈夫",
};

export function genSelfEntries(strCode: string, name: string) {
  return {
    ["S_M " + strCode]: name,
    ["S_F " + strCode]: name,
  };
}

export function getBaseName() {
  let obj: {
    [prop: string]: string;
  } = {};
  Object.entries(UnitNameLookUp).forEach(([key, value]) => {
    if (key == "S_M" || key == "S_F") {
      obj = { ...obj, key: value };
      return;
    }
    obj = { ...obj, ...genSelfEntries(key, value) };
  });
  return obj;
}

export function getName(
  strCode: string,
  useDescWhenNotFound: boolean = true,
): string | null {
  return (
    RelativeNameLookUp[strCode] ??
    (useDescWhenNotFound ? genRelativeDesc(strCode) : null)
  );
}

export function genRelativeDesc(strCode: string): string {
  return strCode
    .split(" ")
    .map(
      (code) => UnitNameLookUp[code as keyof typeof UnitNameLookUp] ?? "未知",
    )
    .join("的");
}

export const RelativeNameLookUp = {
  ...getBaseName(),

  // 二代
  ...genSelfEntries("U_M U_M", "爷爷"),
  ...genSelfEntries("U_M U_F", "奶奶"),
  ...genSelfEntries("U_F U_M", "姥爷"),
  ...genSelfEntries("U_F U_F", "姥姥"),
  ...genSelfEntries("D_M D_M", "孙子"),
  ...genSelfEntries("D_M D_F", "孙女"),
  ...genSelfEntries("D_F D_M", "外孙"),
  ...genSelfEntries("D_F D_F", "外孙女"),
  ...genSelfEntries("Y_M D_M", "侄子"),
  ...genSelfEntries("Y_M D_F", "侄女"),
  ...genSelfEntries("Y_F D_M", "外甥"),
  ...genSelfEntries("Y_F D_F", "外甥女"),
  ...genSelfEntries("O_M D_M", "侄子"),
  ...genSelfEntries("O_M D_F", "侄女"),
  ...genSelfEntries("O_F D_M", "外甥"),
  ...genSelfEntries("O_F D_F", "外甥女"),
  ...genSelfEntries("W_F U_M", "岳父"),
  ...genSelfEntries("W_F U_F", "岳母"),
  ...genSelfEntries("H_M U_M", "公公"),
  ...genSelfEntries("H_M U_F", "婆婆"),
  ...genSelfEntries("W_F D_M", "儿子"),
  ...genSelfEntries("W_F D_F", "女儿"),
  ...genSelfEntries("H_M D_M", "儿子"),
  ...genSelfEntries("H_M D_F", "女儿"),
  ...genSelfEntries("W_F O_M", "大舅子"),
  ...genSelfEntries("W_F Y_M", "小舅子"),
  ...genSelfEntries("W_F O_F", "大姨子"),
  ...genSelfEntries("W_F Y_F", "小姨子"),
  ...genSelfEntries("H_M O_M", "大伯子"),
  ...genSelfEntries("H_M Y_M", "小叔子"),
  ...genSelfEntries("H_M O_F", "大姑子"),
  ...genSelfEntries("H_M Y_F", "小姑子"),

  ...genSelfEntries("D_M W_F", "儿媳"),
  ...genSelfEntries("D_F H_M", "女婿"),
  ...genSelfEntries("U_M D_M W_F", "孙媳"),
  ...genSelfEntries("U_M D_F H_M", "孙女婿"),
  ...genSelfEntries("U_F D_M W_F", "外孙媳"),
  ...genSelfEntries("U_F D_F H_M", "外孙女婿"),
  ...genSelfEntries("Y_M D_M W_F", "侄媳"),
  ...genSelfEntries("Y_M D_F H_M", "侄女婿"),
  ...genSelfEntries("Y_F D_M W_F", "外甥媳"),
  ...genSelfEntries("Y_F D_F H_M", "外甥女婿"),
  ...genSelfEntries("O_M D_M W_F", "侄媳"),
  ...genSelfEntries("O_M D_F H_M", "侄女婿"),
  ...genSelfEntries("O_F D_M W_F", "外甥媳"),
  ...genSelfEntries("O_F D_F H_M", "外甥女婿"),

  ...genSelfEntries("W_F D_M H_M", "表侄婿"),
  ...genSelfEntries("W_F D_F H_M", "表侄婿"),
  ...genSelfEntries("W_F Y_M H_M", "表侄婿"),
  ...genSelfEntries("W_F Y_M H_M", "表侄婿"),
  ...genSelfEntries("W_F O_F H_M", "表侄婿"),
  ...genSelfEntries("W_F Y_F H_M", "表侄婿"),
  ...genSelfEntries("H_M D_M W_F", "堂侄媳"),
  ...genSelfEntries("H_M D_F W_F", "堂侄媳"),
  ...genSelfEntries("H_M Y_M W_F", "堂侄媳"),
  ...genSelfEntries("H_M Y_M W_F", "堂侄媳"),
  ...genSelfEntries("H_M O_F W_F", "堂侄媳"),
  ...genSelfEntries("H_M Y_F W_F", "堂侄媳"),

  // 三代
  ...genSelfEntries("U_M U_M U_M", "曾祖父"),
  ...genSelfEntries("U_M U_M U_F", "曾祖母"),
  ...genSelfEntries("U_M U_F U_M", "曾外祖父"),
  ...genSelfEntries("U_M U_F U_F", "曾外祖母"),
  ...genSelfEntries("U_F U_M U_M", "曾外祖父"),
  ...genSelfEntries("U_F U_M U_F", "曾外祖母"),
  ...genSelfEntries("U_F U_F U_M", "曾外祖父"),
  ...genSelfEntries("U_F U_F U_F", "曾外祖母"),
  ...genSelfEntries("D_M D_M D_M", "曾孙"),
  ...genSelfEntries("D_M D_M D_F", "曾孙女"),
  ...genSelfEntries("D_M D_F D_M", "曾外孙"),
  ...genSelfEntries("D_M D_F D_F", "曾外孙女"),
  ...genSelfEntries("D_F D_M D_M", "曾外孙"),
  ...genSelfEntries("D_F D_M D_F", "曾外孙女"),
  ...genSelfEntries("D_F D_F D_M", "曾外孙"),
  ...genSelfEntries("D_F D_F D_F", "曾外孙女"),
  ...genSelfEntries("Y_M D_M D_M", "曾侄孙"),
  ...genSelfEntries("Y_M D_M D_F", "曾侄孙女"),
  ...genSelfEntries("Y_M D_F D_M", "曾外侄孙"),
  ...genSelfEntries("Y_M D_F D_F", "曾外侄孙女"),
  ...genSelfEntries("Y_F D_M D_M", "曾外甥孙"),
  ...genSelfEntries("Y_F D_M D_F", "曾外甥孙女"),
  ...genSelfEntries("Y_F D_F D_M", "曾外甥孙"),
  ...genSelfEntries("Y_F D_F D_F", "曾外甥孙女"),
  ...genSelfEntries("O_M D_M D_M", "曾侄孙"),
  ...genSelfEntries("O_M D_M D_F", "曾侄孙女"),
  ...genSelfEntries("O_M D_F D_M", "曾外侄孙"),
  ...genSelfEntries("O_M D_F D_F", "曾外侄孙女"),
  ...genSelfEntries("O_F D_M D_M", "曾外甥孙"),
  ...genSelfEntries("O_F D_M D_F", "曾外甥孙女"),
  ...genSelfEntries("O_F D_F D_M", "曾外甥孙"),
  ...genSelfEntries("O_F D_F D_F", "曾外甥孙女"),
  ...genSelfEntries("W_F U_M U_M", "外祖岳父"),
  ...genSelfEntries("W_F U_M U_F", "外祖岳母"),
  ...genSelfEntries("W_F U_F U_M", "外祖岳父"),
  ...genSelfEntries("W_F U_F U_F", "外祖岳母"),
  ...genSelfEntries("H_M U_M U_M", "祖公"),
  ...genSelfEntries("H_M U_M U_F", "祖婆"),
  ...genSelfEntries("H_M U_F U_M", "外祖公"),
  ...genSelfEntries("H_M U_F U_F", "外祖婆"),
  ...genSelfEntries("W_F D_M D_M", "孙女婿"),
  ...genSelfEntries("W_F D_M D_F", "孙女婿"),
  ...genSelfEntries("W_F D_F D_M", "外孙女婿"),
  ...genSelfEntries("W_F D_F D_F", "外孙女婿"),
  ...genSelfEntries("H_M D_M D_M", "孙女婿"),
  ...genSelfEntries("H_M D_M D_F", "孙女婿"),
  ...genSelfEntries("H_M D_F D_M", "外孙女婿"),
  ...genSelfEntries("H_M D_F D_F", "外孙女婿"),
  ...genSelfEntries("W_F O_M D_M", "表侄"),
  ...genSelfEntries("W_F O_M D_F", "表侄女"),
  ...genSelfEntries("W_F Y_M D_M", "表侄"),
  ...genSelfEntries("W_F Y_M D_F", "表侄女"),
  ...genSelfEntries("W_F O_F D_M", "表侄"),
  ...genSelfEntries("W_F O_F D_F", "表侄女"),
  ...genSelfEntries("W_F Y_F D_M", "表侄"),
  ...genSelfEntries("W_F Y_F D_F", "表侄女"),
  ...genSelfEntries("H_M O_M D_M", "堂侄"),
  ...genSelfEntries("H_M O_M D_F", "堂侄女"),
  ...genSelfEntries("H_M Y_M D_M", "堂侄"),
  ...genSelfEntries("H_M Y_M D_F", "堂侄女"),
  ...genSelfEntries("H_M O_F D_M", "堂侄"),
  ...genSelfEntries("H_M O_F D_F", "堂侄女"),
  ...genSelfEntries("H_M Y_F D_M", "堂侄"),
  ...genSelfEntries("H_M Y_F D_F", "堂侄女"),

  // 四代
  ...genSelfEntries("U_M U_M U_M U_M", "高祖父"),
  ...genSelfEntries("U_M U_M U_M U_F", "高祖母"),
  ...genSelfEntries("U_M U_M U_F U_M", "高外祖父"),
  ...genSelfEntries("U_M U_M U_F U_F", "高外祖母"),
  ...genSelfEntries("U_M U_F U_M U_M", "高外祖父"),
  ...genSelfEntries("U_M U_F U_M U_F", "高外祖母"),
  ...genSelfEntries("U_M U_F U_F U_M", "高外祖父"),
  ...genSelfEntries("U_M U_F U_F U_F", "高外祖母"),
  ...genSelfEntries("U_F U_M U_M U_M", "高外祖父"),
  ...genSelfEntries("U_F U_M U_M U_F", "高外祖母"),
  ...genSelfEntries("U_F U_M U_F U_M", "高外祖父"),
  ...genSelfEntries("U_F U_M U_F U_F", "高外祖母"),
  ...genSelfEntries("U_F U_F U_M U_M", "高外祖父"),
  ...genSelfEntries("U_F U_F U_M U_F", "高外祖母"),
  ...genSelfEntries("U_F U_F U_F U_M", "高外祖父"),
  ...genSelfEntries("U_F U_F U_F U_F", "高外祖母"),
  ...genSelfEntries("D_M D_M D_M D_M", "玄孙"),
  ...genSelfEntries("D_M D_M D_M D_F", "玄孙女"),
  ...genSelfEntries("D_M D_M D_F D_M", "玄外孙"),
  ...genSelfEntries("D_M D_M D_F D_F", "玄外孙女"),
  ...genSelfEntries("D_M D_F D_M D_M", "玄外孙"),
  ...genSelfEntries("D_M D_F D_M D_F", "玄外孙女"),
  ...genSelfEntries("D_M D_F D_F D_M", "玄外孙"),
  ...genSelfEntries("D_M D_F D_F D_F", "玄外孙女"),
  ...genSelfEntries("D_F D_M D_M D_M", "玄外孙"),
  ...genSelfEntries("D_F D_M D_M D_F", "玄外孙女"),
  ...genSelfEntries("D_F D_M D_F D_M", "玄外孙"),
  ...genSelfEntries("D_F D_M D_F D_F", "玄外孙女"),
  ...genSelfEntries("D_F D_F D_M D_M", "玄外孙"),
  ...genSelfEntries("D_F D_F D_M D_F", "玄外孙女"),
  ...genSelfEntries("D_F D_F D_F D_M", "玄外孙"),
  ...genSelfEntries("D_F D_F D_F D_F", "玄外孙女"),
  ...genSelfEntries("Y_M D_M D_M D_M", "玄侄孙"),
  ...genSelfEntries("Y_M D_M D_M D_F", "玄侄孙女"),
  ...genSelfEntries("Y_M D_M D_F D_M", "玄外侄孙"),
  ...genSelfEntries("Y_M D_M D_F D_F", "玄外侄孙女"),
  ...genSelfEntries("Y_M D_F D_M D_M", "玄外侄孙"),
  ...genSelfEntries("Y_M D_F D_M D_F", "玄外侄孙女"),
  ...genSelfEntries("Y_M D_F D_F D_M", "玄外侄孙"),
  ...genSelfEntries("Y_M D_F D_F D_F", "玄外侄孙女"),
  ...genSelfEntries("Y_F D_M D_M D_M", "玄外甥孙"),
  ...genSelfEntries("Y_F D_M D_M D_F", "玄外甥孙女"),
  ...genSelfEntries("Y_F D_M D_F D_M", "玄外甥孙"),
  ...genSelfEntries("Y_F D_M D_F D_F", "玄外甥孙女"),
  ...genSelfEntries("Y_F D_F D_M D_M", "玄外甥孙"),
  ...genSelfEntries("Y_F D_F D_M D_F", "玄外甥孙女"),
  ...genSelfEntries("Y_F D_F D_F D_M", "玄外甥孙"),
  ...genSelfEntries("Y_F D_F D_F D_F", "玄外甥孙女"),
  ...genSelfEntries("O_M D_M D_M D_M", "玄侄孙"),
  ...genSelfEntries("O_M D_M D_M D_F", "玄侄孙女"),
  ...genSelfEntries("O_M D_M D_F D_M", "玄外侄孙"),
  ...genSelfEntries("O_M D_M D_F D_F", "玄外侄孙女"),
  ...genSelfEntries("O_M D_F D_M D_M", "玄外侄孙"),
  ...genSelfEntries("O_M D_F D_M D_F", "玄外侄孙女"),
  ...genSelfEntries("O_M D_F D_F D_M", "玄外侄孙"),
  ...genSelfEntries("O_M D_F D_F D_F", "玄外侄孙女"),
  ...genSelfEntries("O_F D_M D_M D_M", "玄外甥孙"),
  ...genSelfEntries("O_F D_M D_M D_F", "玄外甥孙女"),
  ...genSelfEntries("O_F D_M D_F D_M", "玄外甥孙"),
  ...genSelfEntries("O_F D_M D_F D_F", "玄外甥孙女"),
  ...genSelfEntries("O_F D_F D_M D_M", "玄外甥孙"),
  ...genSelfEntries("O_F D_F D_M D_F", "玄外甥孙女"),
  ...genSelfEntries("O_F D_F D_F D_M", "玄外甥孙"),
  ...genSelfEntries("O_F D_F D_F D_F", "玄外甥孙女"),
  ...genSelfEntries("W_F U_M U_M U_M", "外曾祖岳父"),
  ...genSelfEntries("W_F U_M U_M U_F", "外曾祖岳母"),
  ...genSelfEntries("W_F U_M U_F U_M", "外曾祖岳父"),
  ...genSelfEntries("W_F U_M U_F U_F", "外曾祖岳母"),
  ...genSelfEntries("W_F U_F U_M U_M", "外曾祖岳父"),
  ...genSelfEntries("W_F U_F U_M U_F", "外曾祖岳母"),
  ...genSelfEntries("W_F U_F U_F U_M", "外曾祖岳父"),
  ...genSelfEntries("W_F U_F U_F U_F", "外曾祖岳母"),
  ...genSelfEntries("H_M U_M U_M U_M", "曾祖公"),
  ...genSelfEntries("H_M U_M U_M U_F", "曾祖婆"),
  ...genSelfEntries("H_M U_M U_F U_M", "外曾祖公"),
  ...genSelfEntries("H_M U_M U_F U_F", "外曾祖婆"),
  ...genSelfEntries("H_M U_F U_M U_M", "外曾祖公"),
  ...genSelfEntries("H_M U_F U_M U_F", "外曾祖婆"),
  ...genSelfEntries("H_M U_F U_F U_M", "外曾祖公"),
  ...genSelfEntries("H_M U_F U_F U_F", "外曾祖婆"),
  ...genSelfEntries("W_F D_M D_M D_M", "曾孙女婿"),
  ...genSelfEntries("W_F D_M D_M D_F", "曾孙女婿"),
  ...genSelfEntries("W_F D_M D_F D_M", "曾外孙女婿"),
  ...genSelfEntries("W_F D_M D_F D_F", "曾外孙女婿"),
  ...genSelfEntries("W_F D_F D_M D_M", "曾外孙女婿"),
  ...genSelfEntries("W_F D_F D_M D_F", "曾外孙女婿"),
  ...genSelfEntries("W_F D_F D_F D_M", "曾外孙女婿"),
  ...genSelfEntries("W_F D_F D_F D_F", "曾外孙女婿"),
  ...genSelfEntries("H_M D_M D_M D_M", "曾孙女婿"),
  ...genSelfEntries("H_M D_M D_M D_F", "曾孙女婿"),
  ...genSelfEntries("H_M D_M D_F D_M", "曾外孙女婿"),
  ...genSelfEntries("H_M D_M D_F D_F", "曾外孙女婿"),
  ...genSelfEntries("H_M D_F D_M D_M", "曾外孙女婿"),
  ...genSelfEntries("H_M D_F D_M D_F", "曾外孙女婿"),
  ...genSelfEntries("H_M D_F D_F D_M", "曾外孙女婿"),
  ...genSelfEntries("H_M D_F D_F D_F", "曾外孙女婿"),
  ...genSelfEntries("W_F O_M D_M D_M", "表侄孙"),
  ...genSelfEntries("W_F O_M D_M D_F", "表侄孙女"),
  ...genSelfEntries("W_F O_M D_F D_M", "表外孙"),
  ...genSelfEntries("W_F O_M D_F D_F", "表外孙女"),
  ...genSelfEntries("W_F Y_M D_M D_M", "表侄孙"),
  ...genSelfEntries("W_F Y_M D_M D_F", "表侄孙女"),
  ...genSelfEntries("W_F Y_M D_F D_M", "表外孙"),
  ...genSelfEntries("W_F Y_M D_F D_F", "表外孙女"),
  ...genSelfEntries("W_F O_F D_M D_M", "表侄孙"),
  ...genSelfEntries("W_F O_F D_M D_F", "表侄孙女"),
  ...genSelfEntries("W_F O_F D_F D_M", "表外孙"),
  ...genSelfEntries("W_F O_F D_F D_F", "表外孙女"),
  ...genSelfEntries("W_F Y_F D_M D_M", "表侄孙"),
  ...genSelfEntries("W_F Y_F D_M D_F", "表侄孙女"),
  ...genSelfEntries("W_F Y_F D_F D_M", "表外孙"),
  ...genSelfEntries("W_F Y_F D_F D_F", "表外孙女"),
  ...genSelfEntries("H_M O_M D_M D_M", "堂侄孙"),
  ...genSelfEntries("H_M O_M D_M D_F", "堂侄孙女"),
  ...genSelfEntries("H_M O_M D_F D_M", "堂外孙"),
  ...genSelfEntries("H_M O_M D_F D_F", "堂外孙女"),
  ...genSelfEntries("H_M Y_M D_M D_M", "堂侄孙"),
  ...genSelfEntries("H_M Y_M D_M D_F", "堂侄孙女"),
  ...genSelfEntries("H_M Y_M D_F D_M", "堂外孙"),
  ...genSelfEntries("H_M Y_M D_F D_F", "堂外孙女"),
  ...genSelfEntries("H_M O_F D_M D_M", "堂侄孙"),
  ...genSelfEntries("H_M O_F D_M D_F", "堂侄孙女"),
  ...genSelfEntries("H_M O_F D_F D_M", "堂外孙"),
  ...genSelfEntries("H_M O_F D_F D_F", "堂外孙女"),
  ...genSelfEntries("H_M Y_F D_M D_M", "堂侄孙"),
  ...genSelfEntries("H_M Y_F D_M D_F", "堂侄孙女"),
  ...genSelfEntries("H_M Y_F D_F D_M", "堂外孙"),
  ...genSelfEntries("H_M Y_F D_F D_F", "堂外孙女"),

  // 母亲的哥哥
  ...genSelfEntries("U_F O_M", "舅舅"),
  // 母亲的哥哥的妻子
  ...genSelfEntries("U_F O_M W_F", "舅母"),
  // 母亲的哥哥的儿子
  ...genSelfEntries("U_F O_M D_M", "表哥"),
  // 母亲的哥哥的女儿
  ...genSelfEntries("U_F O_M D_F", "表姐"),
  // 母亲的弟弟的妻子
  ...genSelfEntries("U_F Y_M W_F", "姨夫"),
  // 母亲的弟弟的儿子
  ...genSelfEntries("U_F Y_M D_M", "表弟"),
  // 母亲的弟弟的女儿
  ...genSelfEntries("U_F Y_M D_F", "表妹"),
  // 母亲的姐姐的儿子
  ...genSelfEntries("U_F O_F D_M", "表哥"),
  // 母亲的姐姐的女儿
  ...genSelfEntries("U_F O_F D_F", "表姐"),
  // 母亲的妹妹的儿子
  ...genSelfEntries("U_F Y_F D_M", "表弟"),
  // 母亲的妹妹的女儿
  ...genSelfEntries("U_F Y_F D_F", "表妹"),
  // 母亲的哥哥的孙子
  ...genSelfEntries("U_F O_M D_M D_M", "表侄"),
  // 母亲的哥哥的孙女
  ...genSelfEntries("U_F O_M D_M D_F", "表侄女"),
  // 母亲的哥哥的外孙
  ...genSelfEntries("U_F O_M D_F D_M", "表外甥"),
  // 母亲的哥哥的外孙女
  ...genSelfEntries("U_F O_M D_F D_F", "表外甥女"),
  // 母亲的弟弟的孙子
  ...genSelfEntries("U_F Y_M D_M D_M", "表侄"),
  // 母亲的弟弟的孙女
  ...genSelfEntries("U_F Y_M D_M D_F", "表侄女"),
  // 母亲的弟弟的外孙
  ...genSelfEntries("U_F Y_M D_F D_M", "表外甥"),
  // 母亲的弟弟的外孙女
  ...genSelfEntries("U_F Y_M D_F D_F", "表外甥女"),
  // 母亲的弟弟
  ...genSelfEntries("U_F Y_M", "小舅"),
  // 母亲的弟弟的妻子
  ...genSelfEntries("U_F Y_M W_F", "小舅母"),
  // 母亲的弟弟的儿子
  ...genSelfEntries("U_F Y_M D_M", "表弟"),
  // 母亲的弟弟的女儿
  ...genSelfEntries("U_F Y_M D_F", "表妹"),
  // 母亲的弟弟的孙子
  ...genSelfEntries("U_F Y_M D_M D_M", "表侄"),
  // 母亲的弟弟的孙女
  ...genSelfEntries("U_F Y_M D_M D_F", "表侄女"),
  // 母亲的弟弟的外孙
  ...genSelfEntries("U_F Y_M D_F D_M", "表外甥"),
  // 母亲的弟弟的外孙女
  ...genSelfEntries("U_F Y_M D_F D_F", "表外甥女"),
  // 母亲的弟弟的儿媳
  ...genSelfEntries("U_F Y_M D_M W_F", "表弟媳"),
  // 母亲的弟弟的女婿
  ...genSelfEntries("U_F Y_M D_F H_M", "表妹夫"),

  // 母亲的姐姐
  ...genSelfEntries("U_F O_F", "大姨"),
  // 母亲的姐姐的儿子
  ...genSelfEntries("U_F O_F D_M", "表哥"),
  // 母亲的姐姐的女儿
  ...genSelfEntries("U_F O_F D_F", "表姐"),
  // 母亲的姐姐的孙子
  ...genSelfEntries("U_F O_F D_M D_M", "表侄"),
  // 母亲的姐姐的孙女
  ...genSelfEntries("U_F O_F D_M D_F", "表侄女"),
  // 母亲的姐姐的外孙
  ...genSelfEntries("U_F O_F D_F D_M", "表外甥"),
  // 母亲的姐姐的外孙女
  ...genSelfEntries("U_F O_F D_F D_F", "表外甥女"),
  // 母亲的姐姐的儿媳
  ...genSelfEntries("U_F O_F D_M W_F", "表嫂"),
  // 母亲的姐姐的女婿
  ...genSelfEntries("U_F O_F D_F H_M", "表姐夫"),

  // 母亲的妹妹
  ...genSelfEntries("U_F Y_F", "小姨"),
  // 母亲的妹妹的儿子
  ...genSelfEntries("U_F Y_F D_M", "表弟"),
  // 母亲的妹妹的女儿
  ...genSelfEntries("U_F Y_F D_F", "表妹"),
  // 母亲的妹妹的孙子
  ...genSelfEntries("U_F Y_F D_M D_M", "表侄"),
  // 母亲的妹妹的孙女
  ...genSelfEntries("U_F Y_F D_M D_F", "表侄女"),
  // 母亲的妹妹的外孙
  ...genSelfEntries("U_F Y_F D_F D_M", "表外甥"),
  // 母亲的妹妹的外孙女
  ...genSelfEntries("U_F Y_F D_F D_F", "表外甥女"),
  // 母亲的妹妹的儿媳
  ...genSelfEntries("U_F Y_F D_M W_F", "表弟媳"),
  // 母亲的妹妹的女婿
  ...genSelfEntries("U_F Y_F D_F H_M", "表妹夫"),
};
