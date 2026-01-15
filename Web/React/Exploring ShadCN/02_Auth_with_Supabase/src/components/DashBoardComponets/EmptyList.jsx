import React from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Contact } from "lucide-react";
import { Button } from "../ui/button";

const EmptyList = () => {
  return (
 
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Contact />
        </EmptyMedia>
        <EmptyTitle>No data</EmptyTitle>
        <EmptyDescription>No Contacts found</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Add New</Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyList;
