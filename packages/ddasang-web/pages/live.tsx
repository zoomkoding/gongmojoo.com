import PageHeader from "@/components/PageHeader";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Live: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <PageHeader />
      <div>{router.query.name}</div>
    </div>
  );
};

export default Live;
