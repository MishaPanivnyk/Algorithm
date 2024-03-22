class Room {
  constructor(name, type, shape, params) {
    this.name = name;
    this.type = type;
    this.shape = shape;
    this.params = params;
  }

  calculateArea() {
    return this.shape.calculateArea(this.params);
  }
}
class RectangleRoom {
  constructor() {
    this.name = "прямокутна";
  }

  calculateArea(params) {
    return params.length * params.width;
  }
}

class TriangleRoom {
  constructor() {
    this.name = "трикутна";
  }

  calculateArea(params) {
    return 0.5 * params.base * params.height;
  }
}

class CircularRoom {
  constructor() {
    this.name = "кругла";
  }

  calculateArea(params) {
    return Math.PI * Math.pow(params.radius, 2);
  }
}

class Apartment {
  constructor() {
    this.rooms = [];
  }

  addRoom(room) {
    this.rooms.push(room);
  }

  getTotalLivingArea() {
    let totalArea = 0;
    this.rooms.forEach((room) => {
      totalArea += room.type.isLiving ? room.calculateArea() : 0;
    });
    return totalArea;
  }

  getTotalArea() {
    let totalArea = 0;
    this.rooms.forEach((room) => {
      totalArea += room.calculateArea();
    });
    return totalArea;
  }

  listRooms() {
    this.rooms.forEach((room) => {
      console.log(
        `Назва: ${room.name}, Опис: ${room.type.description}, Форма: ${room.shape.name}`
      );
    });
  }

  countRoomsByShape() {
    const roomCounts = {};
    this.rooms.forEach((room) => {
      roomCounts[room.shape.name] = (roomCounts[room.shape.name] || 0) + 1;
    });
    return roomCounts;
  }

  countRoomsByType() {
    const roomCounts = {};
    this.rooms.forEach((room) => {
      roomCounts[room.type.name] = (roomCounts[room.type.name] || 0) + 1;
    });
    return roomCounts;
  }

  getGasUsage() {
    return Math.floor(Math.random() * 100);
  }

  getWaterUsage() {
    let waterUsage = 0;
    this.rooms.forEach((room) => {
      if (room.type.name === "Кухня" || room.type.name === "Ванна") {
        waterUsage += room.calculateArea();
      }
    });
    return waterUsage;
  }
}

class RoomType {
  constructor(name, description, isLiving, shape) {
    this.name = name;
    this.description = description;
    this.isLiving = isLiving;
    this.shape = shape;
  }
}

const livingRoomType = new RoomType("Вітальня", "Житлова кімната", true);
const sleepRoomType = new RoomType("Спальня", "Житлова кімната", true);
const kitchenRoomType = new RoomType("Кухня", "Кухонна кімната", false);
const bathroomRoomType = new RoomType("Ванна", "Ванна кімната", false);

const room1 = new Room("Кімната 1", livingRoomType, new RectangleRoom(), {
  length: 5,
  width: 4,
});
const room2 = new Room("Кімната 2", kitchenRoomType, new TriangleRoom(), {
  base: 6,
  height: 4,
});
const room3 = new Room("Кімната 3", bathroomRoomType, new CircularRoom(), {
  radius: 3,
});
const room4 = new Room("Кімната 1", sleepRoomType, new RectangleRoom(), {
  length: 5,
  width: 6,
});

const apartment = new Apartment();
apartment.addRoom(room1);
apartment.addRoom(room2);
apartment.addRoom(room3);
apartment.addRoom(room4);

console.log("Загальна площа житлових кімнат:", apartment.getTotalLivingArea());
console.log("Загальна площа всіх кімнат:", apartment.getTotalArea());
console.log("Перелік кімнат:");
apartment.listRooms();
console.log("Кількість кімнат кожної форми:", apartment.countRoomsByShape());
console.log("Кількість кімнат кожного типу:", apartment.countRoomsByType());
console.log("Витрачений газ:", apartment.getGasUsage());
console.log("Витрачена вода Кухня+Ванна:", apartment.getWaterUsage());
