import { useState, useMemo } from 'react';
import type { Recipe } from '@/types';
import RecipeCard from './RecipeCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface RecipeListProps {
  recipes: Recipe[];
  onViewDetail: (recipe: Recipe) => void;
}

export default function RecipeList({ recipes, onViewDetail }: RecipeListProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(recipes.map((r) => r.category));
    return Array.from(cats);
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(search.toLowerCase()) ||
        recipe.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        !selectedCategory || recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [recipes, search, selectedCategory]);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => setSearch('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Recipe grid - responsive for tablet container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onViewDetail={onViewDetail}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No recipes found</p>
          {(search || selectedCategory) && (
            <Button
              variant="link"
              onClick={() => {
                setSearch('');
                setSelectedCategory(null);
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}