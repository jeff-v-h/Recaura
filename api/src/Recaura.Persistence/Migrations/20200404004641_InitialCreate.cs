using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Recaura.Persistence.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Honorific = table.Column<string>(type: "nvarchar(10)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    DOB = table.Column<DateTime>(type: "date", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    CountryCode = table.Column<string>(type: "varchar(10)", nullable: true),
                    HomePhone = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    MobilePhone = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(10)", nullable: false),
                    Occupation = table.Column<string>(type: "nvarchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Practitioners",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Honorific = table.Column<string>(type: "nvarchar(10)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    DOB = table.Column<DateTime>(type: "date", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    CountryCode = table.Column<string>(type: "varchar(10)", nullable: true),
                    HomePhone = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    MobilePhone = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(10)", nullable: false),
                    JobLevel = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    RegistrationID = table.Column<string>(type: "nvarchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Practitioners", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CaseFiles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PatientId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Created = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaseFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CaseFiles_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Consultations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CaseFileId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(type: "date", nullable: false),
                    Number = table.Column<int>(nullable: false),
                    PractitionerId = table.Column<int>(nullable: false),
                    SubjectiveId = table.Column<int>(nullable: false),
                    ObjectiveId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consultations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Consultations_CaseFiles_CaseFileId",
                        column: x => x.CaseFileId,
                        principalTable: "CaseFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Consultations_Practitioners_PractitionerId",
                        column: x => x.PractitionerId,
                        principalTable: "Practitioners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ForwardPlans",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    ConsultationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForwardPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ForwardPlans_Consultations_ConsultationId",
                        column: x => x.ConsultationId,
                        principalTable: "Consultations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ObjectiveAssessments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ConsultationId = table.Column<int>(nullable: false),
                    Observation = table.Column<string>(nullable: true),
                    Palpation = table.Column<string>(nullable: true),
                    Additional = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObjectiveAssessments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ObjectiveAssessments_Consultations_ConsultationId",
                        column: x => x.ConsultationId,
                        principalTable: "Consultations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SubjectiveAssessments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ConsultationId = table.Column<int>(nullable: false),
                    MOI = table.Column<string>(nullable: true),
                    CurrentHistory = table.Column<string>(nullable: true),
                    BodyChart = table.Column<string>(nullable: true),
                    AggravatingFactors = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    EasingFactors = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    VAS = table.Column<int>(nullable: true),
                    PastHistory = table.Column<string>(nullable: true),
                    SocialHistory = table.Column<string>(nullable: true),
                    Imaging = table.Column<string>(nullable: true),
                    GeneralHealth = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectiveAssessments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubjectiveAssessments_Consultations_ConsultationId",
                        column: x => x.ConsultationId,
                        principalTable: "Consultations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Treatments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    ConsultationId = table.Column<int>(nullable: false),
                    Quantity = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Treatments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Treatments_Consultations_ConsultationId",
                        column: x => x.ConsultationId,
                        principalTable: "Consultations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActiveTests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    ObjectiveAssessmentId = table.Column<int>(nullable: false),
                    Value = table.Column<decimal>(type: "decimal", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActiveTests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActiveTests_ObjectiveAssessments_ObjectiveAssessmentId",
                        column: x => x.ObjectiveAssessmentId,
                        principalTable: "ObjectiveAssessments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FunctionalTests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    ObjectiveAssessmentId = table.Column<int>(nullable: false),
                    Result = table.Column<string>(type: "nvarchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FunctionalTests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FunctionalTests_ObjectiveAssessments_ObjectiveAssessmentId",
                        column: x => x.ObjectiveAssessmentId,
                        principalTable: "ObjectiveAssessments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NeurologicalTests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    ObjectiveAssessmentId = table.Column<int>(nullable: false),
                    Result = table.Column<string>(type: "nvarchar(20)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NeurologicalTests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NeurologicalTests_ObjectiveAssessments_ObjectiveAssessmentId",
                        column: x => x.ObjectiveAssessmentId,
                        principalTable: "ObjectiveAssessments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PassiveTests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    ObjectiveAssessmentId = table.Column<int>(nullable: false),
                    Value = table.Column<decimal>(type: "decimal", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PassiveTests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PassiveTests_ObjectiveAssessments_ObjectiveAssessmentId",
                        column: x => x.ObjectiveAssessmentId,
                        principalTable: "ObjectiveAssessments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResistedIsometricTests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    ObjectiveAssessmentId = table.Column<int>(nullable: false),
                    Value = table.Column<decimal>(type: "decimal", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResistedIsometricTests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResistedIsometricTests_ObjectiveAssessments_ObjectiveAssessmentId",
                        column: x => x.ObjectiveAssessmentId,
                        principalTable: "ObjectiveAssessments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SpecialTests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    ObjectiveAssessmentId = table.Column<int>(nullable: false),
                    Result = table.Column<string>(type: "nvarchar(20)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecialTests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SpecialTests_ObjectiveAssessments_ObjectiveAssessmentId",
                        column: x => x.ObjectiveAssessmentId,
                        principalTable: "ObjectiveAssessments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActiveTests_ObjectiveAssessmentId",
                table: "ActiveTests",
                column: "ObjectiveAssessmentId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseFiles_PatientId",
                table: "CaseFiles",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Consultations_CaseFileId",
                table: "Consultations",
                column: "CaseFileId");

            migrationBuilder.CreateIndex(
                name: "IX_Consultations_PractitionerId",
                table: "Consultations",
                column: "PractitionerId");

            migrationBuilder.CreateIndex(
                name: "IX_ForwardPlans_ConsultationId",
                table: "ForwardPlans",
                column: "ConsultationId");

            migrationBuilder.CreateIndex(
                name: "IX_FunctionalTests_ObjectiveAssessmentId",
                table: "FunctionalTests",
                column: "ObjectiveAssessmentId");

            migrationBuilder.CreateIndex(
                name: "IX_NeurologicalTests_ObjectiveAssessmentId",
                table: "NeurologicalTests",
                column: "ObjectiveAssessmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ObjectiveAssessments_ConsultationId",
                table: "ObjectiveAssessments",
                column: "ConsultationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PassiveTests_ObjectiveAssessmentId",
                table: "PassiveTests",
                column: "ObjectiveAssessmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ResistedIsometricTests_ObjectiveAssessmentId",
                table: "ResistedIsometricTests",
                column: "ObjectiveAssessmentId");

            migrationBuilder.CreateIndex(
                name: "IX_SpecialTests_ObjectiveAssessmentId",
                table: "SpecialTests",
                column: "ObjectiveAssessmentId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectiveAssessments_ConsultationId",
                table: "SubjectiveAssessments",
                column: "ConsultationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Treatments_ConsultationId",
                table: "Treatments",
                column: "ConsultationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActiveTests");

            migrationBuilder.DropTable(
                name: "ForwardPlans");

            migrationBuilder.DropTable(
                name: "FunctionalTests");

            migrationBuilder.DropTable(
                name: "NeurologicalTests");

            migrationBuilder.DropTable(
                name: "PassiveTests");

            migrationBuilder.DropTable(
                name: "ResistedIsometricTests");

            migrationBuilder.DropTable(
                name: "SpecialTests");

            migrationBuilder.DropTable(
                name: "SubjectiveAssessments");

            migrationBuilder.DropTable(
                name: "Treatments");

            migrationBuilder.DropTable(
                name: "ObjectiveAssessments");

            migrationBuilder.DropTable(
                name: "Consultations");

            migrationBuilder.DropTable(
                name: "CaseFiles");

            migrationBuilder.DropTable(
                name: "Practitioners");

            migrationBuilder.DropTable(
                name: "Patients");
        }
    }
}
