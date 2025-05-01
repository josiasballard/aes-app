const bcrypt = require('bcrypt');

(async () => {
    const newPassword = "Admin123!";  // Change if needed
    const hash = await bcrypt.hash(newPassword, 10);
    console.log("New Hashed Password:", hash);
})();
