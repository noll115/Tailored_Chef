from recipe_scrapers import scrape_me
import random
import json

scraper = [scrape_me('http://allrecipes.com/Recipe/Apple-Cake-Iv/Detail.aspx'), scrape_me('https://www.allrecipes.com/Recipe/Buffalo-Cheesy-Chicken-Lasagna/Detail.aspx'), scrape_me('https://www.allrecipes.com/recipe/54675/roasted-garlic-cauliflower/'), scrape_me('https://www.allrecipes.com/recipe/14276/strawberry-spinach-salad-i/'), scrape_me('https://www.allrecipes.com/recipe/25202/beef-stroganoff-iii/'), scrape_me('https://www.allrecipes.com/recipe/25371/lime-chicken-soft-tacos/'), scrape_me('https://www.allrecipes.com/recipe/14565/naan/'), scrape_me('https://www.allrecipes.com/recipe/14830/hummus-iii/'), scrape_me('https://www.allrecipes.com/recipe/76129/spinach-tomato-tortellini/'), scrape_me('https://www.allrecipes.com/recipe/86687/broccoli-with-garlic-butter-and-cashews/;'), scrape_me('https://www.allrecipes.com/recipe/77981/butternut-squash-soup-ii/'), scrape_me('https://www.allrecipes.com/recipe/9454/greek-baklava/'), scrape_me('https://www.allrecipes.com/recipe/67952/roasted-brussels-sprouts/'), scrape_me('https://www.allrecipes.com/recipe/26692/annies-fruit-salsa-and-cinnamon-chips/'), scrape_me('https://www.allrecipes.com/recipe/49552/quinoa-and-black-beans/'), scrape_me('https://www.allrecipes.com/recipe/11758/baked-ziti-i/'), scrape_me('https://www.allrecipes.com/recipe/256398/spongy-japanese-cheesecake/'), scrape_me('https://www.allrecipes.com/recipe/246628/spaghetti-cacio-e-pepe/'), scrape_me('https://www.allrecipes.com/recipe/193585/authentic-bangladeshi-beef-curry/'), scrape_me('https://www.allrecipes.com/recipes/86/world-cuisine/'), scrape_me('https://www.allrecipes.com/video/4175/easy-slow-cooker-meatballs/'), scrape_me('https://www.allrecipes.com/recipe/256610/grandmas-hungarian-stuffed-cabbage-slow-cooker-variation/'), scrape_me('https://www.allrecipes.com/recipe/277492/slow-cooker-vegan-leek-and-potato-soup/'), scrape_me('https://www.allrecipes.com/recipe/276263/rosemary-roasted-chicken-with-apples-and-potatoes/'), scrape_me('https://www.allrecipes.com/recipe/276149/indian-chicken-saag/')]

for i in range(len(scraper)):
    x = scraper[i].total_time()
    if x == 0:
        x = random.randint(5,91)

    ingredient_dict = {}
    ingredient_array = scraper[i].ingredients()
    for i in range(len(ingredient_array)):
        ingr_str = ingredient_array[i].split()
        ingr = ""
        for j in range(2, len(ingr_str)):
            ingr = ingr + " " + ingr_str[j]
        ingredient_dict[ingr.lstrip()] = ingr_str[0] + " " + ingr_str[1]
    
    recipe = {
        'title': scraper[i].title(),
        'total_time': x,
        'yields': scraper[i].yields(),
        'ingredients': ingredient_dict,
        'instructions': scraper[i].instructions(),
        'image': scraper[i].image(),
        'calorie': random.randint(50,1001)
    }
    recipe_dumped = json.dumps(recipe)
    with open('recipe.json','a') as recipe_dumped :
        json.dump(recipe,recipe_dumped, indent = 4)

x = scraper[4].title()

print(x)
