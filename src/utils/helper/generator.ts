export const generateBreadcrumb = (pathname: string) => {
  const breadcrumb = [];

  if (pathname === "/") {
    breadcrumb.push({
      dest: "/",
      label: "Home",
    });
  } else if (pathname.includes("/products")) {
    breadcrumb.push({
      dest: "/",
      label: "Home",
    });

    breadcrumb.push({
      dest: "/products",
      label: "Product",
    });

    if (pathname.includes("/create")) {
      breadcrumb.push({
        dest: "/products/create",
        label: "Create",
      });
    } else if (pathname.includes("/edit")) {
      breadcrumb.push({
        dest: "/products/edit",
        label: "Edit",
      });
    }
  }

  return breadcrumb;
};
