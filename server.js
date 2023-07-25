const express = require("express");
const app = express();
const mongoose = require("mongoose");

const FamilyMember = require("./models/family_member");
const Family = require("./models/family");
const AreaResponsibility = require("./models/area_responsibility");
const Task = require("./models/task");
const Bedroom = require("./models/bedroom");
const Homework = require("./models/homework");
const Reading = require("./models/reading");
const Exercise = require("./models/exercise");
const Practice = require("./models/practice");
const PersonalReward = require("./models/personal_reward");

const bodyParser = require("body-parser");
const cors = require("cors");

const MONGO_URI = `mongodb+srv://efficiencymarriesefficacy:rgjpzApk7GkmFH3E@choreboard.3tzkea2.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "choreboard",
  })
  .then(() => {
    console.log("CONNECTED TO MongoDB");
  })
  .catch((error) => {
    console.log.error("ERROR: CONNECTING TO MongoDB: ", error);
  });

//1.add family member...............tested by Thunder
app.post("/family_member", async (req, res) => {
  try {
    const {
      name,
      email,
      userName,
      password,
      date_of_birth,
      gender,
      user_type,
      role,
      family_id,
      image,
    } = req.body;

    const member = new FamilyMember({
      name,
      email,
      userName,
      password,
      date_of_birth,
      gender,
      user_type,
      role,
      family_id,
      image,
    });

    const result = await FamilyMember.collection.insertOne(member);
    res.status(201).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured while saving family member" });
  }
});

//--------------------------------------------------------------------------------------------

//update image in file
app.put("/family_member/:name", async (req, res) => {
  const { name } = req.params;
  const { image } = req.body;
  const imageBuffer = Buffer.from(image);

  try {
    const result = await FamilyMember.updateOne(
      { name },
      { $set: { image: imageBuffer } }
    );
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error occured while updating family member" });
  }
});

//------------------------------------------------------------------------------------------------------

//2.get all family members...............tested by Thunder
app.get("/family_members", async (req, res) => {
  try {
    const family_members = await FamilyMember.find({});
    res.status(200).json(family_members);
    console.log(family_members);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error occured while getting family members" });
  }
});

//---------------------------------------------------------------------------------------------

//3.set or update number_of_members in Family...............tested by Thunder
app.put("/family", async (req, res) => {
  try {
    const { family_name, number_of_members } = req.body;
    const result = await Family.updateOne(
      { family_name },
      { $set: { number_of_members } }
    );
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error occured while updating number of members" });
  }
});

//---------------------------------------------------------------------------------------------

//4.Assign area of responsibility...............Tested by Thunder
app.post("/area", async (req, res) => {
  try {
    const { assigned, status, name } = req.body;
    const area = await AreaResponsibility.collection.insertOne({
      assigned,
      status,
      name,
    });
    res.status(200).json(area);
    console.log(area);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error occured while assigning area of responsibility" });
    return;
  }
});

//--------------------------------------------------------------------------------------------

//5.Delete area of responsibility...............Tested by Thunder
app.delete("/area/:assigned", async (req, res) => {
  try {
    const { assigned } = req.params;
    const result = await AreaResponsibility.deleteOne({ assigned });
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error occured while deleting area of responsibility" });
  }
});

//--------------------------------------------------------------------------------------------

//6.get all areas of responsibility...............Tested by Thunder
app.get("/areas", async (req, res) => {
  try {
    const areas = await AreaResponsibility.find({});
    res.status(200).json(areas);
    console.log(areas);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error occured while getting areas of responsibility" });
  }
});

//--------------------------------------------------------------------------------------------

//7.get all areas of responsibility assigned to Family Member..........Tested by Thunder
app.get("/areas/:name", async (req, res) => {
  let name;
  try {
    const { name } = req.params;
    console.log(name);
    const areas = await AreaResponsibility.find({ name });
    console.log(name);
    res.status(200).json(areas);
    console.log(areas);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Error occured while getting ${name}'s areas of responsibility`,
    });
  }
});

//--------------------------------------------------------------------------------------------

//8.Assign task to family member....................................Tested by Thunder
app.post("/task", async (req, res) => {
  try {
    const { description, status, name } = req.body;
    const task = await Task.collection.insertOne({ description, status, name });
    res.status(200).json(task);
    console.log(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured while assigning task" });
  }
});

//--------------------------------------------------------------------------------------------

//9.get all tasks assigned..............................Tested by Thunder
app.get("/tasks", async (req, res) => {
  try {
    const task = await Task.find({});
    res.status(200).json(task);
    console.log(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured while getting tasks" });
  }
});

//---------------------------------------------------------------------------------------------

//10.get all tasks assigned to family member.....................Tested by Thunder
app.get("/tasks/:name", async (req, res) => {
  let name;
  try {
    const { name } = req.params;
    const tasks = await Task.find({ name });
    res.status(200).json(tasks);
    console.log(tasks);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error occured while getting ${name}'s tasks` });
  }
});

//--------------------------------------------------------------------------------------------

//11.delete task assigned..................................Tested by Thunder
app.delete("/task/:description", async (req, res) => {
  try {
    const { description } = req.body;
    const result = await Task.deleteOne({ description });
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured while deleting tasks" });
  }
});

app.get("/bedrooms", async (req, res) => {
  try {
    const bedroom = await Bedroom.find({});
    res.status(200).json(bedroom);
    console.log(bedroom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured while getting bedrooms" });
  }
  return;
});

//12.add bedroom.....................................Tested by Thunder
app.post("/bedroom", async (req, res) => {
  try {
    const { status, name } = req.body;
    const bedroom = await Bedroom.collection.insertOne({ status, name });
    res.status(200).json(bedroom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured while adding bedroom" });
  }
});

//14.delete bedroom assigned to family member...............Tested by Thunder
app.delete("/bedroom/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const result = await Bedroom.deleteOne({ name });
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured while deleting bedroom" });
  }
});
app.get("/homework", async (req, res) => {
  try {
    const homework = await Homework.find({});
    res.status(200).json(homework);
    console.log(homework);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured while getting homework" });
  }
  return;
  // return;
});


//15.Add homework Assignment...................................Tested by Thunder
app.post("/homework", async (req, res) => {
  try {
    const { assigned, name, status } = req.body;
    const homework = await Homework.collection.insertOne({
      assigned,
      name,
      status,
    });
    res.status(200).json(homework);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured while adding homework" });
  }
});

//16.Delete homework assigned.................Tested by Thunder
app.delete("/homework/:assigned", async (req, res) => {
  try {
    const { assigned } = req.params;
    const result = await Homework.deleteOne({ assigned });
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured while deleting homework" });
  }
});

//17.Add reading time.............................Tested by Thunder
app.post("/reading", async (req, res) => {
  try {
    const { status, book, page_number, name } = req.body;
    const reading = await Reading.collection.insertOne({
      page_number,
      book,
      name,
      status,
    });
    res.status(200).json(reading);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error occured while adding reading assignment" });
  }
});

//18.get all books read by family member....................................Tested by Thunder
app.get("/reading/:name", async (req, res) => {
  let name;
  try {
    const { name } = req.params;
    const reading = await Reading.find({ name });
    res.status(200).json(reading);
    console.log(reading);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Error occured while getting ${name}'s reading assignment`,
    });
  }
});

//19.get all books being read by family members....................................Tested by Thunder
app.get("/reading", async (req, res) => {
  try {
    const reading = await Reading.find({});
    res.status(200).json(reading);
    console.log(reading);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        "Error occured while getting all family members' reading assignments",
    });
  }
});

//20.delete book.................................................Tested by Thunder
app.delete("/reading/:book", async (req, res) => {
  try {
    const { book } = req.params;
    const result = await Reading.deleteOne({ book });
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error occured while deleting reading assignment" });
  }
});

//21.add exercise...........................................................Tested by Thunder
app.post("/exercise", async (req, res) => {
  try {
    const { description, status, name } = req.body;
    const exercise = await Exercise.collection.insertOne({
      status,
      description,
      name,
    });
    res.status(200).json(exercise);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured while adding exercise" });
  }
});

//22.get all exercise by family member.................Tested by Thunder
app.get("/exercise/:name", async (req, res) => {
  let name;
  try {
    const { name } = req.params;
    const exercise = await Exercise.find({ name });
    res.status(200).json(exercise);
    console.log(exercise);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error occured while getting ${name}'s exercise` });
  }
});

//23.get all exercise...........................Tested by Thunder
app.get("/exercise", async (req, res) => {
  try {
    const exercise = await Exercise.find({});
    res.status(200).json(exercise);
    console.log(exercise);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error occured while getting all family members' exercise",
    });
  }
});

//24.delete exercise by family_name and description.................Tested by Thunder
app.delete("/exercise/:name/:description", async (req, res) => {
  let name, description;
  try {
    const { name, description } = req.params;
    const result = await Exercise.deleteOne({ name, description });
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error occured while deleting ${name}'s ${description}` });
  }
});

//25.add practice.................................Tested by Thunder
app.post("/practice", async (req, res) => {
  try {
    const { description, status, name, duration } = req.body;
    const practice = await Practice.collection.insertOne({
      description,
      status,
      name,
      duration,
    });
    res.status(200).json(practice);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured while adding practice" });
  }
});

//26.delete practice by description and name...................Tested by Thunder
app.delete("/practice/:description/:name", async (req, res) => {
  let name, description;
  try {
    const { description, name } = req.params;
    const result = await Practice.deleteOne({ description, name });
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error occured while deleting ${name}'s ${description}` });
  }
});

//27.get practice by name.........................Tested by Thunder
app.get("/practice/:name", async (req, res) => {
  let name;
  try {
    const { name } = req.params;
    const practice = await Practice.find({ name });
    res.status(200).json(practice);
    console.log(practice);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error occured while getting ${name}'s practice` });
  }
});

//28.Get all practice.......................Tested by Thunder
app.get("/practice", async (req, res) => {
  try {
    const practice = await Practice.find({});
    res.status(200).json(practice);
    console.log(practice);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error occured while getting all family members' practice",
    });
  }
});

//29.post rewards.....................................Tested by Thunder
app.post("/rewards", async (req, res) => {
  try {
    const {
      for_helping,
      do_what,
      bucks,
      amount,
      date_of_reward,
      total_bucks,
      name,
    } = req.body;
    const rewards = await PersonalReward.collection.insertOne({
      for_helping,
      do_what,
      bucks,
      amount,
      date_of_reward,
      total_bucks,
      name,
    });
    res.status(200).json(rewards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured while adding rewards" });
  }
});

//update Total rewards........................Not working
app.put("/rewards/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { total_bucks } = req.body;
    const rewards = await PersonalReward.updateOne(
      { name },
      { $set: { total_bucks } }
    );
    res.status(200).json(rewards);
    console.log(rewards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured while updating rewards" });
  }
});

//30.get all rewards....................................Tested by Thunder
app.get("/rewards", async (req, res) => {
  try {
    const rewards = await PersonalReward.find({});
    res.status(200).json(rewards);
    console.log(rewards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured while getting all rewards" });
  }
});

//31.get all rewards by name........................Tested by Thunder
app.get("/rewards/:name", async (req, res) => {
  let name;
  try {
    const { name } = req.params;
    const rewards = await PersonalReward.find({ name });
    res.status(200).json(rewards);
    console.log(rewards);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error occured while getting ${name} rewards` });
  }
});
//32.delete rewards by name and description.........Tested by Thunder
app.delete("/rewards/:name/:description", async (req, res) => {
  let name, description;
  try {
    const { name, description } = req.body;
    const result = await PersonalReward.deleteOne({ name, description });
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error occured while deleting ${name}'s ${description}` });
  }
});

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING");
});
