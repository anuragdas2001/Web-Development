const queue = require("../config/kue");

const reset_email_mailer = require("../mailers/reset_password");

queue.process("reset", function (job, done) {
  console.log("reset worker is processing a job", job.data);

  reset_email_mailer.reset_Password(job.data);

  done();
});
