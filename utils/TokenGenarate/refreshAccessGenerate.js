const jwt = require("jsonwebtoken");
const Doctor = require("../../models/doctor");
const Patient = require("../../models/Patient");
const Admin = require("../../models/PortalAdminModel");
const { generateAccessToken } = require("./generateAccessToken");


const refreshAccessToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log("decoded", decoded);

        if (!decoded) {
            throw new Error("Invalid refresh token");
        }

        if(decoded.roles === "doctor"){
            const Doctor = await Doctor.findOne({ _id: decoded._id });
            if (!Doctor || Doctor.token !== refreshToken) {
                throw new Error("Invalid refresh token");
            }
        }
        if(decoded.roles === "patient"){
            const Patient = await Patient.findOne({ _id: decoded._id });
            if (!Patient || Patient.token !== refreshToken) {
                throw new Error("Invalid refresh token");
            }
        }
        if(decoded.roles === "admin"){
            const Admin = await Admin.findOne({ _id: decoded._id });
            if (!Admin || Admin.token !== refreshToken) {
                throw new Error("Invalid refresh token");
            }
        }



       

        const accessToken = generateAccessToken({
            _id: decoded._id,
            roles: decoded.roles,
            fName: decoded.fName,
            lName: decoded.lName,
        });

        return { accessToken };

    } catch (err) {
        console.error("Error refreshing access token:", err);
        return null;
    }
};

module.exports = { refreshAccessToken };
