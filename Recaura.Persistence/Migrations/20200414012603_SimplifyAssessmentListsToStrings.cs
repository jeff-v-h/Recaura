using Microsoft.EntityFrameworkCore.Migrations;

namespace Recaura.Persistence.Migrations
{
    public partial class SimplifyAssessmentListsToStrings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "Treatments");

            migrationBuilder.AddColumn<string>(
                name: "Active",
                table: "ObjectiveAssessments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FunctionalTests",
                table: "ObjectiveAssessments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NeurologicalTests",
                table: "ObjectiveAssessments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Passive",
                table: "ObjectiveAssessments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ResistedIsometric",
                table: "ObjectiveAssessments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpecialTests",
                table: "ObjectiveAssessments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Plans",
                table: "Consultations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Treatments",
                table: "Consultations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "ObjectiveAssessments");

            migrationBuilder.DropColumn(
                name: "FunctionalTests",
                table: "ObjectiveAssessments");

            migrationBuilder.DropColumn(
                name: "NeurologicalTests",
                table: "ObjectiveAssessments");

            migrationBuilder.DropColumn(
                name: "Passive",
                table: "ObjectiveAssessments");

            migrationBuilder.DropColumn(
                name: "ResistedIsometric",
                table: "ObjectiveAssessments");

            migrationBuilder.DropColumn(
                name: "SpecialTests",
                table: "ObjectiveAssessments");

            migrationBuilder.DropColumn(
                name: "Plans",
                table: "Consultations");

            migrationBuilder.DropColumn(
                name: "Treatments",
                table: "Consultations");

            migrationBuilder.CreateTable(
                name: "ActiveTests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    ObjectiveAssessmentId = table.Column<int>(type: "int", nullable: false),
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
                name: "ForwardPlans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    ConsultationId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true)
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
                name: "FunctionalTests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    ObjectiveAssessmentId = table.Column<int>(type: "int", nullable: false),
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    ObjectiveAssessmentId = table.Column<int>(type: "int", nullable: false),
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    ObjectiveAssessmentId = table.Column<int>(type: "int", nullable: false),
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    ObjectiveAssessmentId = table.Column<int>(type: "int", nullable: false),
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    ObjectiveAssessmentId = table.Column<int>(type: "int", nullable: false),
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

            migrationBuilder.CreateTable(
                name: "Treatments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Comment = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    ConsultationId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
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

            migrationBuilder.CreateIndex(
                name: "IX_ActiveTests_ObjectiveAssessmentId",
                table: "ActiveTests",
                column: "ObjectiveAssessmentId");

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
                name: "IX_Treatments_ConsultationId",
                table: "Treatments",
                column: "ConsultationId");
        }
    }
}
