CREATE DATABASE Recauradb;
GO
USE Recauradb;
GO
CREATE TABLE Patients (
    Id INT IDENTITY (1, 1),
    Honorific NVARCHAR(10),
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    DOB DATE,
    Email NVARCHAR(255),
    CountryCode VARCHAR(10),
    HomePhone NVARCHAR(40),
    MobilePhone NVARCHAR(40),
    Gender NVARCHAR(10),
    Occupation NVARCHAR(50)
    CONSTRAINT PK_Patients PRIMARY KEY (Id)
);
GO
CREATE TABLE Practitioners (
    Id INT IDENTITY (1, 1),
    Honorific NVARCHAR(10),
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    DOB DATE,
    Email NVARCHAR(255),
    CountryCode VARCHAR(10),
    HomePhone NVARCHAR(40),
    MobilePhone NVARCHAR(40),
    Gender NVARCHAR(10),
    JobLevel NVARCHAR(50),
    RegistrationID NVARCHAR(50),
    CONSTRAINT PK_Practitioners PRIMARY KEY (Id)
);
GO
CREATE TABLE CaseFiles (
    [Id] INT IDENTITY (1, 1),
    [PatientId] INT,
    [Name] NVARCHAR(MAX),
    [Created] DATE,
    CONSTRAINT PK_CaseFiles PRIMARY KEY (Id),
    CONSTRAINT FK_CaseFiles_Patients_PatientId FOREIGN KEY (PatientId) REFERENCES Patients(Id) ON DELETE CASCADE
);
GO
CREATE TABLE Consultations (
    Id INT IDENTITY (1, 1),
    CaseFileId INT,
    [Date] DATE,
    [Number] INT,
    PractitionerId INT,
    SubjectiveId INT,
    ObjectiveId INT,
    Plans NVARCHAR(MAX),
    Treatments NVARCHAR(MAX),
    CONSTRAINT PK_Consultations PRIMARY KEY (Id),
    CONSTRAINT FK_Consultations_CaseFiles_CaseFileId FOREIGN KEY (CaseFileId) REFERENCES CaseFiles(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Consultations_Practitioners_PractitionerId FOREIGN KEY (PractitionerId) REFERENCES Practitioners(Id) ON DELETE CASCADE
);
GO
CREATE TABLE ObjectiveAssessments (
    Id INT IDENTITY (1, 1),
    ConsultationId INT,
    Observation NVARCHAR(MAX),
    Palpation NVARCHAR(MAX),
    Additional NVARCHAR(MAX),
    Active NVARCHAR(MAX),
    FunctionalTests NVARCHAR(MAX),
    NeurologicalTests NVARCHAR(MAX),
    Passive NVARCHAR(MAX),
    ResistedIsometric NVARCHAR(MAX),
    SpecialTests NVARCHAR(MAX),
    CONSTRAINT PK_ObjectiveAssessments PRIMARY KEY (Id),
    CONSTRAINT FK_ObjectiveAssessments_Consultations_ConsultationId FOREIGN KEY (ConsultationId) REFERENCES Consultations(Id) ON DELETE CASCADE
);
GO
CREATE TABLE SubjectiveAssessments (
    Id INT IDENTITY (1, 1),
    ConsultationId INT,
    MOI NVARCHAR(MAX),
    CurrentHistory NVARCHAR(MAX),
    BodyChart NVARCHAR(MAX),
    AggravatingFactors NVARCHAR(100),
    EasingFactors NVARCHAR(100),
    VAS INT,
    PastHistory NVARCHAR(MAX),
    SocialHistory NVARCHAR(MAX),
    Imaging NVARCHAR(MAX),
    GeneralHealth NVARCHAR(MAX),
    CONSTRAINT PK_SubjectiveAssessments PRIMARY KEY (Id),
    CONSTRAINT FK_SubjectiveAssessments_Consultations_ConsultationId FOREIGN KEY (ConsultationId) REFERENCES Consultations(Id) ON DELETE CASCADE
);
GO