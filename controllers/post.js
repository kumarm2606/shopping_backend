const conn = require("../config/database");
const post = async (req, res) => {
    const request_fields = ["title",'category',"description","price"];

    var error_flag = false;
    var return_data = {};
    if (error_flag == false) {
      for (var i = 0; i < request_fields.length; i++) {
        var field = request_fields[i];
        if (typeof req.body[field] == "undefined" || req.body[field] == "") {
          return_data.success = false;
          return_data.message = field + " field is required";
          error_flag = true;
          break;
        }
      }
    }
    if (error_flag) {
      return res.json(return_data);
    }
    const { title, category,description,price} = req.body;
    if (!title || !category || !description || !price) {
      res.status(400).json({
        message: "Pls Fill the value",
        status: "fail", 
      });
    }
    try {
      await conn.connect(async (err) => {
        const insert = `INSERT INTO posts (category,description,price,title) VALUES ('${category}','${description}','${price}','${title}')`;;
        await conn.query(insert, (err) => {
          if (err) throw err;
          res.json({
            message: "success",
            status: true,
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
};
		const postlist =async(req, res)=>{ 
           const {id} = req.query
            console.log(req,"====================")
            await conn.connect(async (err) => {
                let sql =""
                if(id){
                    sql = `SELECT * FROM posts WHERE id=${id}`;
                }else{
                    sql = `SELECT * FROM posts`;
                }
               
console.log(sql)
                await conn.query(sql, (err, result) => {
                  if (err) throw err;
                  if (!result.length) {
                    let msg = "data is empty";
                    return res.status(200).json({
                      message: msg,
                      status: "failed",
                    });
                  } else {
                    return res.json({
                        data : result,
                      message: "ok",
                      status: "success",
                    });
                  }
                });
              });

        }
        const update = async (req, res) => {
            const request_fields = ["title",'category',"description","price"];
        
            var error_flag = false;
            var return_data = {};
            if (error_flag == false) {
              for (var i = 0; i < request_fields.length; i++) {
                var field = request_fields[i];
                if (typeof req.body[field] == "undefined" || req.body[field] == "") {
                  return_data.success = false;
                  return_data.message = field + " field is required";
                  error_flag = true;
                  break;
                }
              }
            }
            if (error_flag) {
              return res.json(return_data);
            }
            const { title, category,description,price ,id} = req.body;
            if (!title || !category || !description || !price) {
              res.status(400).json({
                message: "Pls Fill the value",
                status: "fail", 
              });
            }
            try {
              await conn.connect(async (err) => {
                const insert = `UPDATE  posts SET category='${category}',description='${description}',price='${price}',title='${title}' WHERE id = ${id}`;;
                await conn.query(insert, (err) => {
                  if (err) throw err;
                  res.json({
                    message: "success",
                    status: true,
                  });
                });
              });
            } catch (error) {
              console.log(error);
            }
        };
	

module.exports ={
    post,
    postlist,
    update
}