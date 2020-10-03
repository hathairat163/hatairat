
module.exports = (sequelize,Sequelize) => {
    const Tutorial = sequelize.define("tutorial",{
        Tasktitel: {tyep: Sequelize.STRTING},
        TaskDate: {type: Sequelize.DATEONLY},
        TaskTimeStart: {tyep: Sequelize.TIME},
        TaskTimeEnd: {tyep: Sequelize.TIME},
        TaskDescription: {tyep: Sequelize.STRTING},
        TaskReady: {tyep: Sequelize.BOOLEAN},
    });
    return Tutorial;
};