"use client";

import Link from "next/link";
import moment from "moment";
import { Chip } from "@nextui-org/chip";
import { useTranslations } from "next-intl";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/organisms/data-table/column-header";
import { Tooltip, TooltipConcat } from "@/components/atoms";
import {
  getLessonGradeChipColor,
  getLessonStatusChipColor,
} from "@/lib/getChipColors";

import { ActionsColumn } from "./actions-column";
import { instructorLessonSchema, type InstructorLesson } from "./schema";

export const columns: ColumnDef<InstructorLesson>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="InstructorLessons.id" />
    ),
    cell: ({ row }) => <>{row.getValue("id")}</>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "student-name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="InstructorLessons.student-name"
      />
    ),
    cell: ({ row }) => {
      const instructorLesson = instructorLessonSchema.parse(row.original);

      return (
        <Link
          href={`/dash/admin/students?studentId=${instructorLesson.studentId}`}
        >
          <TooltipConcat
            className="text-left"
            text={instructorLesson.studentName}
          />
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="InstructorLessons.status" />
    ),
    cell: function Cell({ row }) {
      const t = useTranslations(
        "Dashboard.Dossier.Tables.InstructorLessons.Status",
      );
      const instructorLesson = instructorLessonSchema.parse(row.original);

      return (
        <Chip
          color={getLessonStatusChipColor(instructorLesson.status)}
          size="sm"
        >
          <span className="font-bold !text-[10px] md:text-sm">
            {t(instructorLesson.status)?.toUpperCase()}
          </span>
        </Chip>
      );
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="InstructorLessons.comment"
      />
    ),
    cell: ({ row }) => <TooltipConcat text={row.getValue("comment") || "-"} />,
  },
  {
    accessorKey: "grade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="InstructorLessons.grade" />
    ),
    cell: ({ row }) => {
      const instructorLesson = instructorLessonSchema.parse(row.original);

      if (instructorLesson.grade === -1) return <>-</>;

      return (
        <Chip color={getLessonGradeChipColor(instructorLesson.grade)} size="sm">
          <span className="font-bold !text-[10px] md:text-sm">
            {instructorLesson.grade}
          </span>
        </Chip>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="InstructorLessons.price" />
    ),
    cell: ({ row }) => <>{row.getValue("price")} DH</>,
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="InstructorLessons.duration"
      />
    ),
    cell: ({ row }) => <>{row.getValue("duration")}h</>,
  },
  {
    accessorKey: "scheduledDate",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="InstructorLessons.scheduled-date"
      />
    ),
    cell: ({ row }) => {
      const instructorLesson = instructorLessonSchema.parse(row.original);
      const date = moment(instructorLesson.scheduledDate);

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
