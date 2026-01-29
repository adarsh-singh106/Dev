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
import { FriendModal } from "./FriendModal";

const EmptyList = ({onAdd,}) => {
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
        <FriendModal 
        onSubmit={onAdd}
        trigger={<Button>Add New</Button>}
        
        />
      </EmptyContent>
    </Empty>
  );
};

export default EmptyList;
