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
  constructor(email, phoneNumbers, mobileOperator, monthlySubscriptionFee) {
    this.email = email;
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
  constructor(fullName, dateOfBirth) {
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
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
    for (let i = 0; i < this.forms.length; i++) {
      for (let j = 0; j < this.forms[i].languages.length; j++) {
        languagesSet.add(this.forms[i].languages[j].name);
      }
    }
    return Array.from(languagesSet);
  }

  getStudentsKnowingLanguage(languageName) {
    let count = 0;
    for (let i = 0; i < this.forms.length; i++) {
      for (let j = 0; j < this.forms[i].languages.length; j++) {
        if (this.forms[i].languages[j].name === languageName) {
          count++;
          break;
        }
      }
    }
    return count;
  }

  getStudentsKnowingLanguageAtLevel(languageName, proficiencyLevel) {
    let count = 0;
    for (let i = 0; i < this.forms.length; i++) {
      for (let j = 0; j < this.forms[i].languages.length; j++) {
        if (
          this.forms[i].languages[j].name === languageName &&
          this.forms[i].languages[j].proficiencyLevel === proficiencyLevel
        ) {
          count++;
          break;
        }
      }
    }
    return count;
  }

  getTotalMonthlySubscriptionFee(email) {
    for (let i = 0; i < this.forms.length; i++) {
      if (this.forms[i].contacts) {
        for (let j = 0; j < this.forms[i].contacts.length; j++) {
          if (this.forms[i].contacts[j].email === email) {
            let totalFee = 0;
            for (let k = 0; k < this.forms[i].contacts.length; k++) {
              totalFee += this.forms[i].contacts[k].monthlySubscriptionFee;
            }
            return totalFee;
          }
        }
      }
    }
    return null;
  }

  getTopAndBottomNMonthlySubscribers(n) {
    let sortedForms = [];
    for (let i = 0; i < this.forms.length; i++) {
      sortedForms.push(this.forms[i]);
    }

    for (let i = 0; i < sortedForms.length; i++) {
      for (let j = i + 1; j < sortedForms.length; j++) {
        let totalA = 0;
        for (let k = 0; k < sortedForms[i].contacts.length; k++) {
          totalA += sortedForms[i].contacts[k].monthlySubscriptionFee;
        }
        let totalB = 0;
        for (let k = 0; k < sortedForms[j].contacts.length; k++) {
          totalB += sortedForms[j].contacts[k].monthlySubscriptionFee;
        }
        if (totalB > totalA) {
          let temp = sortedForms[i];
          sortedForms[i] = sortedForms[j];
          sortedForms[j] = temp;
        }
      }
    }

    let topN = [];
    let bottomN = [];
    for (let i = 0; i < n; i++) {
      if (sortedForms[i]) {
        topN.push(sortedForms[i]);
      }
      if (sortedForms[sortedForms.length - 1 - i]) {
        bottomN.push(sortedForms[sortedForms.length - 1 - i]);
      }
    }

    return {
      topN: topN,
      bottomN: bottomN,
    };
  }
}
// Приклад використання:
let dbForm = new DBForm();

let form1 = new PersonalInformationForm("Misha Panivnyk", "2005-01-01");
form1.addLanguage(new Language("English", "Intermediate", "In Progress"));
form1.addLanguage(new Language("Spanish", "Beginner", "Paused"));
form1.addContact(
  new Contact("panivnyk@gmail.com", ["123456789"], "Operator A", 20)
);
form1.addContact(
  new Contact("panivnyk@gmail.com", ["987654321"], "Operator B", 25)
);
dbForm.addForm(form1);

let form2 = new PersonalInformationForm("Marko Pyndus", "2000-05-05");
form2.addLanguage(new Language("English", "Advanced", "Completed"));
form2.addLanguage(new Language("French", "Intermediate", "In Progress"));
form2.addContact(
  new Contact("marko@gmail.com", ["111222333"], "Operator A", 18)
);
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
  dbForm.getTopAndBottomNMonthlySubscribers(1)
);
console.log(form1);
