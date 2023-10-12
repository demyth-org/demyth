const mongoose = require('mongoose');

const connect = async () => {
	await mongoose.connect('mongodb+srv://marcoreliooodev:<password>@clustertest.blsuyfn.mongodb.net/');
}


const main = async () => {
	await connect();

	const newKittySchema = new mongoose.Schema({
		name: {type:String, unique:true},
		age: {type: Number, default: 18}
	}, { timestamps: true });
	const Kitten = mongoose.model('Kitten', newKittySchema);
	let res = await Kitten.findOne({ name: /leeloo/i}).exec();
	const leeloo =  res ? res : new Kitten({name:"leeloo"});
	console.log("leeloo added");

	await leeloo.save();

	const kiki = new Kitten({name:'kiki',age:12});
	console.log("kiki added");
	await kiki.save();

	const aCatNamedLeeloo = await Kitten.findOne({ name: /lee/i}).exec();
	console.log(aCatNamedLeeloo._id + " - " + aCatNamedLeeloo.age);

	await mongoose.disconnect();
}

main();