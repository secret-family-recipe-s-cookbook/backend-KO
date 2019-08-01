exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('recipes').insert([
        {
          title: 'beans porridge 1',
          description:
            'porridge beans is also known as jellof beans to some people in this country',
          ingredients:
            'beans, crayfish, palmoil, plantain, pepper, salt, maggi',
          directions: `wash beans thouroughly and boil till half soft,
                      add plantain and continue to boil till soft,
                      then and maggi crayfish all the rest, when soft, add palmoil,
                       boil for 5 more minutes and food is ready to be served`,
          user_id: 1
        },
        {
          title: 'plantain porridge',
          description:
            'porridge plantain is also known as jellof beans to some people in this country',
          ingredients:
            'beans, crayfish, palmoil, plantain, pepper, salt, maggi',
          directions: `wash beans thouroughly and boil till half soft,
                      add plantain and continue to boil till soft,
                      then and maggi crayfish all the rest, when soft, add palmoil,
                       boil for 5 more minutes and food is ready to be served`,
          user_id: 2
        },
        {
          title: 'yam porridge',
          description:
            'porridge plantain is also known as jellof beans to some people in this country',
          ingredients:
            'beans, crayfish, palmoil, plantain, pepper, salt, maggi',
          directions: `wash beans thouroughly and boil till half soft,
                      add plantain and continue to boil till soft,
                      then and maggi crayfish all the rest, when soft, add palmoil,
                       boil for 5 more minutes and food is ready to be served`,
          user_id: 2
        }
      ]);
    });
};
