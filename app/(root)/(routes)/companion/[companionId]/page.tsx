import { auth, redirectToSignIn } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { CompanionForm } from "./components/companion-form";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({
  params
} : CompanionIdPageProps) => {
  const { userId } = auth(); 

  if (!userId) {
    return redirectToSignIn();
  };
  //TODO: Check subscription

  const companion = await prismadb.companion.findUnique({
    where: {
      userId,
      id: params.companionId,
    }
  });

  const categories = await prismadb.category.findMany();

  return ( 
    <CompanionForm 
      initialData={companion}
      categories={categories}
    />
   );
}
 
export default CompanionIdPage;