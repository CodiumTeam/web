var glide = new Glide('.glide', {
  type: 'carousel',
  perView: 2,
  breakpoints: {
    500: {
      perView: 1,
    },
  },
  gap: 20,
});

glide.mount();
