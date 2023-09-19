const conn = require("../config/database");
const { generateJwtToken } = require('../middleware/jwtToken')
const bcrypt = require("bcrypt");

const register = async (req, res) => {
	const { name, userName, password } = req.body;
	if (!name || !userName || !password ) {
		let msg = "Pls enter the all fields";
		res.status(400).json({ message: msg, status: true });
	}else{
		await conn.connect(async (err) => {
			let sql = `SELECT * FROM login WHERE email='${userName}'`;
			await conn.query(sql, async (err, result) => {
				if (err) throw err;
				if (result != "") {
					let msg = "User Already Exist. Please Login";
					return res.status(400).json({
						message: msg,
						status: false,
					});
				} else {
					// if (password === confirmPassword) {
					const salt = await bcrypt.genSalt(10);
					const hashedPassword = await bcrypt.hash(password, salt);
					const insert = `INSERT INTO login (name,password,email) VALUES ('${name}','${hashedPassword}','${userName}')`;
					await conn.query(insert)
					let sql = `SELECT * FROM login WHERE email='${userName}'`;
					await conn.query(sql, async (err, loginResult) => {
						const token = generateJwtToken({id: loginResult[0].id, name:loginResult[0].name, email: userName});
						if (token) {
							return res.status(200).json({
								id: loginResult[0].id, 
								name:loginResult[0].name, 
								email: userName,
								token: token,
								message: "success",
								status: true,
							});
						}
					})
				}
			});
		});
	}
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
	await conn.connect(async (err) => {
		console.log(userName,password)
  		let sql = `SELECT * FROM login WHERE email='${userName}'`
		await conn.query(sql, async (err,result) =>{
		if (err) throw err;
		if(!result.length){
			let msg = "Miss Matched User";
			return res.status(400).json({
			message: msg,
			status: false,
			});
		}else{
			let pwd = result[0].password
			let validPassword = await bcrypt.compare(password,pwd);
			if(!validPassword){
				let msg = "Miss Matched Password";
				return res.status(400).json({
				message: msg,
				status: false,
				});
			}else{
				const token = generateJwtToken({id : result[0].id, name:result[0].name, email: userName })
				console.log(token,"++++++++++++++++++++++");
				if(token){
					
				return res.status(200).json({
					id : result[0].id, 
					name:result[0].name, 
					email: userName,
					token: token,
					message: "success",
					status: true,
					});
				}
			}
		}
		})
	})
  } catch (error) {
	console.log(error);
  }
};

const users = async (req, res) => {
  await conn.connect(async (err) => {
	let sql = `SELECT * FROM login`;
	await conn.query(sql, (err, result) => {
	  if (err) throw err;
	  if (!result.length) {
		let msg = "Users not found";
		return res.status(404).json({
		  message: msg,
		  status: "failed",
		});
	  } else {
		return res.json({
			WS : result,
		  message: "ok",
		  status: "success",
		});
	  }
	});
  });
	// res.status(200).json(req.users)
};

module.exports = {
  register,
  login,
  users,
};
