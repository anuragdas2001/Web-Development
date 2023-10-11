const queue = require('../config/kue');

const comments_email_mailer = require('../mailers/comments_mailer');


queue.process('emails',function(job,done){
    console.log('Emails worker is processing a job',job.data);

    comments_email_mailer.newComment(job.data);

    done();
})