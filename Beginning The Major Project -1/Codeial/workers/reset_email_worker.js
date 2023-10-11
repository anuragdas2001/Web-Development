const queue = require('../config/kue');

const reset_email_mailer = require('../mailers/Forgot_Password');


queue.process('reset',function(job,done){
    console.log('reset worker is processing a job',job.data);

    comments_email_mailer.newComment(job.data);

    done();
})