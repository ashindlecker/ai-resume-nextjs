-- CreateTable
CREATE TABLE "ResumeEmployment" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "currentlyEmployed" BOOLEAN NOT NULL,

    CONSTRAINT "ResumeEmployment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeEmploymentDuty" (
    "id" TEXT NOT NULL,
    "employmentId" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ResumeEmploymentDuty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResumeEmployment" ADD CONSTRAINT "ResumeEmployment_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeEmploymentDuty" ADD CONSTRAINT "ResumeEmploymentDuty_employmentId_fkey" FOREIGN KEY ("employmentId") REFERENCES "ResumeEmployment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
