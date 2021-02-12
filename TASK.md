**Please implement the following app using React and Typescript.**

The code should be well designed and easy to understand.

Comments can be added as needed.
App specifications:
The app should allow the user to create his own pizza.
Pizza cost will be calculated depending on the size, crust type and amount of extra toppings.

User should first pick the size of the pizza:
```
> Small ($8)
> Medium ($10)
> Large ($12).
```

User should then be able to pick the crust type:
```
> Thin (+$2)
> Thick (+$4).
```

Then the user should be presented a list of ingredients with a photo and name to pick as toppings.  
The user should be able to add from [0-3] ingredients from that list without any additional cost for the pizza.  
The user may add more ingredients, but each new addition after the third one costs $0.50.  
The user can't repeat ingredients.

Maximum ingredients for each pizza is:
```
> 5 for small
> 7 for medium
> 9 for large.
```
After the pizza is done, user should see a confirmation screen with his pizza and all detailed information.
Screens:
1. Choose your size
1. Choose your crust
2. Choose your toppings
3. Check your custom pizza

Available toppings:
- Pepperoni
- Mushrooms
- Onions
- Sausage
- Bacon
- Extra cheese
- Black olives
- Green peppers
- Pineapple
- Spinach
  
Bonus points: Implement some backend.  
Request: Please add a Read Me to the project.
