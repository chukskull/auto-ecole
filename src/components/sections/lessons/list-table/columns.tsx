"use client";

import Link from "next/link";
import moment from "moment";
import { LessonStatus } from "@prisma/client";
import { Chip, ChipProps } from "@nextui-org/chip";
import { useTranslations } from "next-intl";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/organisms/data-table/column-header";
import { Tooltip, TooltipConcat } from "@/components/atoms";
import { ActionsColumn } from "./actions-column";
import { lessonSchema } from "./schema";

import type { Lesson } from "./schema";

export const columns: ColumnDef<Lesson>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lessons.id" />
    ),
    cell: ({ row }) => <>{row.getValue("id")}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "student-name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lessons.student-name" />
    ),
    cell: ({ row }) => {
      const lesson = lessonSchema.parse(row.original);

      return (
        <Link href={`/dash/admin/students?studentId=${lesson.student.id}`}>
          <TooltipConcat className="text-left" text={lesson.student.fullName} />
        </Link>
      );
    },
  },
  {
    accessorKey: "instructor-name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lessons.instructor-name" />
    ),
    cell: ({ row }) => {
      const lesson = lessonSchema.parse(row.original);

      return (
        <Link
          href={`/dash/admin/instructors?instructorId=${lesson.instructor.id}`}
        >
          <TooltipConcat
            className="text-left"
            text={lesson.instructor.fullName}
          />
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lessons.status" />
    ),
    cell: function Cell({ row }) {
      const t = useTranslations("Dashboard.Files.Lessons.ListTable.Status");
      const lesson = lessonSchema.parse(row.original);

      const getChipColor = (): ChipProps["color"] => {
        switch (lesson.status) {
          case LessonStatus.RESERVED:
            return "secondary";
          case LessonStatus.CANCELLED:
            return "danger";
          case LessonStatus.DONE:
            return "success";
          default:
            return "primary";
        }
      };

      return (
        <Chip color={getChipColor()} size="sm">
          <span className="font-bold !text-[10px] md:text-sm">
            {t(lesson.status)?.toUpperCase()}
          </span>
        </Chip>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lessons.price" />
    ),
    cell: ({ row }) => <>{row.getValue("price")} DH</>,
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lessons.duration" />
    ),
    cell: ({ row }) => <>{row.getValue("duration")}h</>,
  },
  {
    accessorKey: "scheduledDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lessons.scheduled-date" />
    ),
    cell: ({ row }) => {
      const lesson = lessonSchema.parse(row.original);

      const date = moment(lesson.scheduledDate);

      return <Tooltip content={date.calendar()}>{date.fromNow()}</Tooltip>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <ActionsColumn row={row} />
      </div>
    ),
  },
];