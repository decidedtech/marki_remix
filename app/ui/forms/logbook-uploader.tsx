"use client";
import { updateVehicleWithDocuments } from "@/lib/actions/vehicle";
import { FileData } from "@/lib/definitions";
import { UploadDropzone } from "@/utils/uploadthing";
import React from "react";
interface Props {
  vehicleId: string;
}

const LogbookUploader = ({ vehicleId }: Props) => {
  return (
    <UploadDropzone
      endpoint="logbookUploader"
      onClientUploadComplete={async (res) => {
        await updateVehicleWithDocuments(vehicleId, res as FileData[]);
      }}
      onUploadError={(error) => {
        alert(`ERROR! ${error.message}`);
      }}
      onUploadBegin={(name) => {}}
    />
  );
};

export default LogbookUploader;
