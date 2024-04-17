class Student {
    constructor(id, name, group) {
        this.id = id;
        this.name = name;
        this.group = group;
        this.grades = {};
    }

    changeName(newName) {
        this.name = newName;
    }

    addGrade(subject, grade) {
        this.grades[subject] = grade;
    }

    removeGrade(subject) {
        delete this.grades[subject];
    }
}

class Group {
    static totalStudents = 0;
    static groups = {};

    constructor(name) {
        this.name = name;
        this.students = {};
        Group.groups[name] = this;
    }

    addStudent(student) {
        this.students[student.id] = student;
        Group.totalStudents++;
    }

    removeStudent(studentId) {
        delete this.students[studentId];
        Group.totalStudents--;
    }

    static getTotalStudents() {
        return this.totalStudents;
    }

    getGroupSize() {
        return Object.keys(this.students).length;
    }

    static getTotalGroups() {
        return Object.keys(this.groups).length;
    }
}

// Додавання нового студента в групу
const group1 = new Group("Group 1");
const student1 = new Student(1, "Marko Pyndus", group1);
group1.addStudent(student1);

// Зміна імені студента
student1.changeName("Misha Panivnyk");

// Додавання оцінок студенту
student1.addGrade("Math", 90);
student1.addGrade("English", 85);

console.log("Total groups:", group1);
// Видалення студента з групи
group1.removeStudent(1);

// Додавання нової групи
const group2 = new Group("Group 2");

console.log("Total students:", Group.getTotalStudents());
console.log("Total groups:", Group.getTotalGroups());
