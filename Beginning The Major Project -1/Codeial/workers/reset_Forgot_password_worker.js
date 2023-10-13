const queue = require('../config/kue');

const reset_forgot_password_mailer = require('../mailers/Forgot_Password');


queue.process('reset',function(job,done){

    console.log('reset worker is processing a job',job.data);

    reset_forgot_password_mailer.reset_Forgot_Password(job.data);

    done();
})