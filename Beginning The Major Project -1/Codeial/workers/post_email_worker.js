const queue = require('../config/kue');

const posts_email_mailer = require('../mailers/comments_mailer');


queue.process('emails',function(job,done){
    console.log('Emails worker is processing a job',job.data);

    posts_email_mailer.newPost(job.data);

    done();
})