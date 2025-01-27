"use client";
import { updateClientWithDocuments } from "@/lib/actions/client";
import { FileData } from "@/lib/definitions";
import { UploadDropzone } from "@/utils/uploadthing";
import React from "react";
interface Props {
  clientId: string;
}

const ClientDocumentsUploader = ({ clientId }: Props) => {
  return (
    <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={async (res) => {
        if (res) {
          await updateClientWithDocuments(clientId, res as FileData[]);
        }
      }}
      onUploadError={(error) => {
        alert(`ERROR! ${error.message}`);
      }}
      onUploadBegin={(name) => {}}
    />
  );
};

export default ClientDocumentsUploader;
