import Breadcrumb from '@web-app/app/components/Breadcrumb';

export default async function NewRecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Home link="/dashboard">Dashboard</Breadcrumb.Home>
        <Breadcrumb.Item>New recipe</Breadcrumb.Item>
      </Breadcrumb>
      {children}
    </>
  );
}
