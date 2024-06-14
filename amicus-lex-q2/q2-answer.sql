-- Schools 테이블
CREATE TABLE Schools (
    SchoolID INT AUTO_INCREMENT,
    SchoolName VARCHAR(255) NOT NULL,
    PRIMARY KEY (SchoolID)
);

-- Students 테이블
CREATE TABLE Students (
    StudentID INT AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(20) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Birthday DATE NOT NULL,
    ParentName VARCHAR(255),
    ParentPhoneNumber VARCHAR(20),
    SchoolID INT NOT NULL,
    PRIMARY KEY (StudentID),
    FOREIGN KEY (SchoolID) REFERENCES Schools(SchoolID)
);
CREATE INDEX idx_student_school ON Students(SchoolID);
CREATE INDEX idx_student_name ON Students(Name);
CREATE INDEX idx_student_email ON Students(Email);

-- Teachers 테이블
CREATE TABLE Teachers (
    TeacherID INT AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Subject VARCHAR(100) NOT NULL,
    PRIMARY KEY (TeacherID)
);
CREATE INDEX idx_teacher_subject ON Teachers(Subject);

-- StudentTeachers 테이블
CREATE TABLE StudentTeachers (
    StudentID INT NOT NULL,
    TeacherID INT NOT NULL,
    PRIMARY KEY (StudentID, TeacherID),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID)
);
CREATE INDEX idx_studteach_student ON StudentTeachers(StudentID);
CREATE INDEX idx_studteach_teacher ON StudentTeachers(TeacherID);

-- Interests 테이블
CREATE TABLE Interests (
    InterestID INT AUTO_INCREMENT,
    InterestName VARCHAR(255) NOT NULL,
    PRIMARY KEY (InterestID)
);

-- StudentInterests 테이블
CREATE TABLE StudentInterests (
    StudentID INT NOT NULL,
    InterestID INT NOT NULL,
    PRIMARY KEY (StudentID, InterestID),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (InterestID) REFERENCES Interests(InterestID)
);
CREATE INDEX idx_studinterest_student ON StudentInterests(StudentID);
CREATE INDEX idx_studinterest_interest ON StudentInterests(InterestID);
