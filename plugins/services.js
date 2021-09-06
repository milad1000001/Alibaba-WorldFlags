import registerServices from '../services/Services.js';

export default (ctx, inject) => {
  inject('services', registerServices(ctx.$axios))
}
