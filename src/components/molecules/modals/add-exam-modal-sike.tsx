"use client";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/modal";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import type { ModalComponentType } from "./types";

const AddExamModalSike: ModalComponentType = ({ isOpen, close }) => {
  const t = useTranslations("Dashboard.Modals.AddExamSike");

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      size="sm"
      className="max-h-[80vh] overflow-auto md:max-h-full"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-xs opacity-70">{t("subtitle")}</p>
        </ModalHeader>
        <ModalBody className="flex flex-col items-center justify-center my-4">
          <p className="text-sm text-center opacity-70 lg:max-w-[400px]">
            {t("description")}
          </p>
        </ModalBody>
        <ModalFooter className="w-full">
          <Button variant="outline" onClick={close} className="w-full">
            {t("button-cancel")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddExamModalSike;
