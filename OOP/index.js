class Language {
  constructor(name, proficiencyLevel, currentStatus) {
    this.name = name;
    this.proficiencyLevel = proficiencyLevel;
    this.currentStatus = currentStatus;
  }
}

class Interest {
  constructor(name, duration, usefulnessLevel) {
    this.name = name;
    this.duration = duration;
    this.usefulnessLevel = usefulnessLevel;
  }
}

class Contact {
  constructor(phoneNumbers, mobileOperator, monthlySubscriptionFee) {
    this.phoneNumbers = phoneNumbers;
    this.mobileOperator = mobileOperator;
    this.monthlySubscriptionFee = monthlySubscriptionFee;
  }
}

class FinancialArticle {
  constructor(name, estimatedAmount) {
    this.name = name;
    this.estimatedAmount = estimatedAmount;
  }
}

class PersonalInformationForm {
  constructor(fullName, dateOfBirth, email) {
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.languages = [];
    this.interests = [];
    this.contacts = [];
    this.financialArticles = [];
  }

  addLanguage(language) {
    this.languages.push(language);
  }

  removeLanguage(language) {
    for (let i = 0; i < this.languages.length; i++) {
      if (this.languages[i] === language) {
        this.languages.splice(i, 1);
        break;
      }
    }
  }

  addInterest(interest) {
    this.interests.push(interest);
  }

  removeInterest(interest) {
    for (let i = 0; i < this.interests.length; i++) {
      if (this.interests[i] === interest) {
        this.interests.splice(i, 1);
        break;
      }
    }
  }

  addContact(contact) {
    this.contacts.push(contact);
  }

  removeContact(contact) {
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i] === contact) {
        this.contacts.splice(i, 1);
        break;
      }
    }
  }

  addFinancialArticle(article) {
    this.financialArticles.push(article);
  }

  removeFinancialArticle(article) {
    for (let i = 0; i < this.financialArticles.length; i++) {
      if (this.financialArticles[i] === article) {
        this.financialArticles.splice(i, 1);
        break;
      }
    }
  }
}

class DBForm {
  constructor() {
    this.forms = [];
  }

  addForm(form) {
    this.forms.push(form);
  }

  getUniqueLanguages() {
    let languagesSet = new Set();
    for (let form of this.forms) {
      for (let language of form.languages) {
        languagesSet.add(language.name);
      }
    }
    return Array.from(languagesSet);
  }

  getStudentsKnowingLanguage(languageName) {
    let count = 0;
    for (let form of this.forms) {
      for (let language of form.languages) {
        if (language.name === languageName) {
          count++;
          break;
        }
      }
    }
    return count;
  }

  getStudentsKnowingLanguageAtLevel(languageName, proficiencyLevel) {
    let count = 0;
    for (let form of this.forms) {
      for (let language of form.languages) {
        if (
          language.name === languageName &&
          language.proficiencyLevel === proficiencyLevel
        ) {
          count++;
          break;
        }
      }
    }
    return count;
  }

  getTotalMonthlySubscriptionFee(email) {
    for (let form of this.forms) {
      if (form.email === email) {
        let totalFee = 0;
        for (let contact of form.contacts) {
          totalFee += contact.monthlySubscriptionFee;
        }
        return totalFee;
      }
    }
    return null;
  }

  getTopAndBottom(n) {
    let sortedForms = this.forms.slice();
    let topNCount = 0;
    let bottomNCount = 0;

    for (let i = 0; i < sortedForms.length - 1; i++) {
      for (let j = 0; j < sortedForms.length - 1 - i; j++) {
        let totalA = 0;
        for (let k = 0; k < sortedForms[j].contacts.length; k++) {
          totalA += sortedForms[j].contacts[k].monthlySubscriptionFee;
        }
        let totalB = 0;
        for (let k = 0; k < sortedForms[j + 1].contacts.length; k++) {
          totalB += sortedForms[j + 1].contacts[k].monthlySubscriptionFee;
        }

        if (totalA < totalB) {
          let temp = sortedForms[j];
          sortedForms[j] = sortedForms[j + 1];
          sortedForms[j + 1] = temp;
        }
      }
    }

    topNCount = Math.min(n, sortedForms.length);
    bottomNCount = Math.min(n, sortedForms.length);

    return {
      topNCount: topNCount,
      bottomNCount: bottomNCount,
    };
  }
}

// Приклад використання:
let dbForm = new DBForm();

let form1 = new PersonalInformationForm(
  "Misha Panivnyk",
  "2005-01-01",
  "panivnyk@gmail.com"
);
form1.addLanguage(new Language("English", "Intermediate", "In Progress"));
form1.addLanguage(new Language("Spanish", "Beginner", "Paused"));
form1.addContact(new Contact(["123456789"], "Operator A", 20));
form1.addContact(new Contact(["987654321"], "Operator B", 25));
form1.addContact(new Contact(["987655421"], "Operator B", 100));
dbForm.addForm(form1);

let form2 = new PersonalInformationForm(
  "Marko Pyndus",
  "2000-05-05",
  "marko@gmail.com"
);
form2.addLanguage(new Language("English", "Advanced", "Completed"));
form2.addLanguage(new Language("French", "Intermediate", "In Progress"));
form2.addContact(new Contact(["111222333"], "Operator A", 18));
dbForm.addForm(form2);

console.log("Унікальні мови:", dbForm.getUniqueLanguages());
console.log(
  "Студенти, які знають англійську мову:",
  dbForm.getStudentsKnowingLanguage("English")
);
console.log(
  "Студенти, які володіють англійською на просунутому рівні:",
  dbForm.getStudentsKnowingLanguageAtLevel("English", "Advanced")
);
console.log(
  "Загальна місячна абонентська плата для Михайла:",
  dbForm.getTotalMonthlySubscriptionFee("panivnyk@gmail.com")
);
console.log(
  "Верхній і нижній N передплатників за місяць:",
  dbForm.getTopAndBottom(1)
);
console.log(form1);
