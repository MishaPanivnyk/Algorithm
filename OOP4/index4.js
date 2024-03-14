// Оголошення класу кімнат
class Room {
  constructor(name, type, shape, params) {
    this.name = name;
    this.type = type;
    this.shape = shape;
    this.params = params; // Додано параметри кімнати
  }

  // Метод для обчислення площі кімнати
  calculateArea() {
    let area = 0;
    switch (this.shape) {
      case "прямокутна":
        area = this.params.length * this.params.width; // Використовуємо параметри кімнати
        break;
      case "трикутна":
        area = 0.5 * this.params.base * this.params.height;
        break;
      case "кругла":
        area = Math.PI * Math.pow(this.params.radius, 2);
        break;
      default:
        console.log("Форма кімнати не підтримується");
    }
    return area;
  }
}

// Клас для квартири
class Apartment {
  constructor() {
    this.rooms = [];
  }

  // Додавання кімнати
  addRoom(room) {
    this.rooms.push(room);
  }

  // Метод для обчислення загальної площі житлових кімнат
  getTotalLivingArea() {
    let totalArea = 0;
    this.rooms.forEach((room) => {
      totalArea += room.type.isLiving ? room.calculateArea() : 0;
    });
    return totalArea;
  }

  // Метод для обчислення загальної площі всіх кімнат
  getTotalArea() {
    let totalArea = 0;
    this.rooms.forEach((room) => {
      totalArea += room.calculateArea();
    });
    return totalArea;
  }

  // Метод для виведення інформації про кімнати
  listRooms() {
    this.rooms.forEach((room) => {
      console.log(
        `Назва: ${room.name}, Опис: ${room.type.description}, Форма: ${room.shape}`
      );
    });
  }

  // Метод для знаходження кількості кімнат кожної форми
  countRoomsByShape() {
    const roomCounts = {};
    this.rooms.forEach((room) => {
      roomCounts[room.shape] = (roomCounts[room.shape] || 0) + 1;
    });
    return roomCounts;
  }

  // Метод для знаходження кількості кімнат кожного типу
  countRoomsByType() {
    const roomCounts = {};
    this.rooms.forEach((room) => {
      roomCounts[room.type.name] = (roomCounts[room.type.name] || 0) + 1;
    });
    return roomCounts;
  }

  // Метод для отримання кількості витраченого газу у квартирі
  getGasUsage() {
    // Припустимо, що дані про споживання газу генеруються випадково
    return Math.floor(Math.random() * 100); // Випадкове число від 0 до 100
  }

  // Метод для отримання кількості витраченої води у квартирі
  getWaterUsage() {
    // Припустимо, що дані про споживання води генеруються випадково
    return Math.floor(Math.random() * 100); // Випадкове число від 0 до 100
  }
}

// Оголошення класу типу кімнати
class RoomType {
  constructor(name, description, isLiving) {
    this.name = name;
    this.description = description;
    this.isLiving = isLiving; // Вказує, чи є ця кімната житловою
  }
}

// Встановлюємо типи кімнат
const livingRoomType = new RoomType("Вітальня", "Житлова кімната", true);
const kitchenRoomType = new RoomType("Кухня", "Кухонна кімната", false);
const bathroomRoomType = new RoomType("Ванна", "Ванна кімната", false);

// Створюємо кімнати
const room1 = new Room("Кімната 1", livingRoomType, "прямокутна", {
  length: 5,
  width: 4,
});
const room2 = new Room("Кімната 2", kitchenRoomType, "трикутна", {
  base: 6,
  height: 4,
});
const room3 = new Room("Кімната 3", bathroomRoomType, "кругла", { radius: 3 });

// Створюємо квартиру та додаємо кімнати
const apartment = new Apartment();
apartment.addRoom(room1);
apartment.addRoom(room2);
apartment.addRoom(room3);

// Виводимо результати
console.log("Загальна площа житлових кімнат:", apartment.getTotalLivingArea());
console.log("Загальна площа всіх кімнат:", apartment.getTotalArea());
console.log("Перелік кімнат:");
apartment.listRooms();
console.log("Кількість кімнат кожної форми:", apartment.countRoomsByShape());
console.log("Кількість кімнат кожного типу:", apartment.countRoomsByType());
console.log("Витрачений газ:", apartment.getGasUsage());
console.log("Витрачена вода:", apartment.getWaterUsage());
