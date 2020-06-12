const CronJob = require('cron').CronJob;

const {emailActionEnum: {PRODUCT_CREATE}} = require('../constants');
const {emailService, productService, userService} = require('../services');

module.exports = () => {
  // const job = new CronJob('5 48 21 12 5 *', async () => { // Every 12 june in 21:48:05
  const job = new CronJob('30 * * * * *', async () => { // Every 30 seconds
    const products = await productService.findAllByParams({photo: null});

    for (const product of products) {
      const user = await userService.getOne(product.userId);

      await emailService.sendMail(user.email, PRODUCT_CREATE, {user, product})
    }

    console.log('FINISHED CRON JOB!');
  });

  return job.start();
}
