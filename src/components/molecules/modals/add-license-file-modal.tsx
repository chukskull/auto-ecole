import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/modal";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Category, LicenseFileStatus } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { AddNewLicenseFileForm } from "@/components/organisms";
import { Spinner } from "@/components/atoms";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/utils/api";

import { LicenseFileFormSchema } from "@/schemas/license-file-form-schema";

function AddInstructorModal({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const t = useTranslations("Dashboard.Files.LicenseFiles.AddNewModal");

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm<z.infer<typeof LicenseFileFormSchema>>({
    resolver: zodResolver(LicenseFileFormSchema),
    defaultValues: {
      studentId: "0",
      instructorId: "0",
      price: "3200",
      status: LicenseFileStatus.ONGOING,
      category: Category.B,
    },
  });

  const {
    mutate: addLicenseFile,
    isLoading,
    error,
  } = api.db.licenseFiles.mutation.add.useMutation({
    onSuccess: () => {
      //   void ctx.users.getPage.invalidate();
      toast.success(t("success"));
      closeModal();
    },
    onError: (error) => {
      console.log("CLEANING UP INSTRUCTOR FROM CLERK, FAILURE TO ADD TO DB");
      console.error(error);
      toast.error(t("error"));
    },
  });

  const onSubmit = (values: z.infer<typeof LicenseFileFormSchema>) =>
    addLicenseFile({
      ...values,
      studentId: Number(values.studentId),
      instructorId: Number(values.instructorId),
      price: Number(values.price),
    });

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      size="2xl"
      className="max-h-[80vh] overflow-auto md:max-h-full"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-xs opacity-70">{t("subtitle")}</p>
        </ModalHeader>
        <ModalBody>
          {error && (
            <div className="w-full px-2 py-4 text-center bg-red-100 rounded">
              <p className="text-sm font-bold text-center text-danger">
                {error ? t("no-user-instructor") : t("error")}
              </p>
            </div>
          )}
          <AddNewLicenseFileForm
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6"
          />
        </ModalBody>
        <ModalFooter className="flex items-center justify-end gap-1">
          <Button variant="ghost" onClick={closeModal}>
            {t("button-cancel")}
          </Button>
          <Button
            variant="default"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner size="xs" color="#fff" />
            ) : (
              t("button-submit")
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddInstructorModal;