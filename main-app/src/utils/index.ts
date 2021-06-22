export const localMenu = (data: any[], locales: any) => {
  const result: any[] = [];
  data.forEach((item) => {
    const temp = {
      ...item,
    };
    if (temp.name) {
      temp.name = locales[temp.name];
    }
    if (temp.children) {
      delete temp.children;
      temp.children = localMenu(item.children, locales);
    }
    result.push(temp);
  });

  return result;
};
