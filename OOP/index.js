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
  constructor(fullName, dateOfBirth, emails) {
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.emails = emails || [];
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

  getLanguageLevel(languageName, proficiencyLevel) {
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

  getMonthlySubscription(fullName) {
    for (let i = 0; i < this.forms.length; i++) {
      if (this.forms[i].fullName === fullName) {
        let totalFee = 0;
        for (let j = 0; j < this.forms[i].contacts.length; j++) {
          totalFee += this.forms[i].contacts[j].monthlySubscriptionFee;
        }
        return totalFee;
      }
    }
    return null;
  }

  getTopAndBottom(n, isTop = true) {
    let sortedForms = this.forms.slice();
    sortedForms.sort((a, b) => {
      let totalA = this.getTotalMonthlySubscription(a);
      let totalB = this.getTotalMonthlySubscription(b);
      return isTop ? totalB - totalA : totalA - totalB;
    });

    let count = Math.min(n, sortedForms.length);

    let subscribers = [];

    for (let i = 0; i < count; i++) {
      subscribers.push({
        name: sortedForms[i].fullName,
        monthlySubscription: this.getTotalMonthlySubscription(sortedForms[i]),
      });
    }

    return subscribers;
  }
  getTotalMonthlySubscription(form) {
    let totalFee = 0;
    for (let i = 0; i < form.contacts.length; i++) {
      totalFee += form.contacts[i].monthlySubscriptionFee;
    }
    return totalFee;
  }
}

// Приклад використання:
let dbForm = new DBForm();

let form1 = new PersonalInformationForm("Misha Panivnyk", "2005-01-01", [
  "panivnykm@gmail.com",
  "panivnyk2@gmail.com",
]);
form1.addLanguage(new Language("English", "Intermediate", "In Progress"));
form1.addLanguage(new Language("Spanish", "Beginner", "Paused"));
form1.addInterest(new Interest("Sport", "1 year", "High"));
let contact1 = new Contact(["12345678"], "Operator A", 20);
let contact2 = new Contact(["564644812456"], "Operator B", 20);
let contact3 = new Contact(["564645812456"], "Operator B", 100);
form1.addContact(contact1);
form1.addContact(contact2);
form1.addContact(contact3);
dbForm.addForm(form1);

let form2 = new PersonalInformationForm("Marko Pyndus", "2000-05-05", [
  "marko@gmail.com",
]);
form2.addLanguage(new Language("English", "Advanced", "Completed"));
form2.addLanguage(new Language("French", "Intermediate", "In Progress"));
form2.addContact(new Contact(["564345812456"], "Operator A", 18));
dbForm.addForm(form2);

let form3 = new PersonalInformationForm("Marko Pyndus2", "2000-05-05", [
  "marko2@gmail.com",
]);
form3.addLanguage(new Language("English", "Advanced", "Completed"));
form3.addLanguage(new Language("French", "Intermediate", "In Progress"));
form3.addContact(new Contact(["56434581245"], "Operator A", 18));
form3.addContact(new Contact(["564345812459"], "Operator B", 50));
dbForm.addForm(form3);
console.log("Унікальні мови:", dbForm.getUniqueLanguages());
console.log(
  "Студенти, які знають англійську мову:",
  dbForm.getStudentsKnowingLanguage("English")
);
console.log(
  "Студенти, які володіють англійською на просунутому рівні:",
  dbForm.getLanguageLevel("English", "Advanced")
);
console.log(
  "Загальна місячна абонентська плата для Михайла:",
  dbForm.getMonthlySubscription("Misha Panivnyk")
);
console.log(
  "Верхній і нижній N передплатників за місяць:",
  dbForm.getTopAndBottom(1, false)
);
console.log(dbForm);
