const pool = require("../db/mysql");

const salespeopleModel = async () => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM `salespeople`');
        return rows;
    } catch (err) {
        console.log(err);
        throw new Error("Error in fetching salespeople data.");
    }
};

const addSalespeople = async (SNAME, CITY, COMM) => {
    try {
        const [data] = await pool.query("INSERT INTO salespeople (SNAME, CITY, COMM) VALUES (?,?,?)", [SNAME, CITY, COMM]);
        return { SNUM: data.insertId, SNAME, CITY, COMM };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateSalespeople = async (SNUM, SNAME, CITY, COMM) => {
    try {
        const [data] = await pool.query("UPDATE salespeople SET SNAME=?, CITY=?, COMM=? WHERE SNUM=?", [SNAME, CITY, COMM, SNUM]);
        return { SNUM, SNAME, CITY, COMM };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteSalespeople = async (SNUM) => {
    try {
        const [data] = await pool.query("DELETE FROM salespeople WHERE SNUM=?", [SNUM]);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    salespeopleModel,
    addSalespeople,
    updateSalespeople,
    deleteSalespeople
};
