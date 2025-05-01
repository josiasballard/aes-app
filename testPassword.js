const bcrypt = require('bcrypt');

(async () => {
    const hashedPassword = "$2b$10$Vv1EXYQO5.LJXfgyF9tPMOusPMZbrJ.m.kc3j3B8iXW/ncVCnnjE."; // Your stored hash
    const enteredPassword = "Admin123!"; // The password you're testing

    const match = await bcrypt.compare(enteredPassword, hashedPassword);
    console.log("Password Match:", match);
})();
