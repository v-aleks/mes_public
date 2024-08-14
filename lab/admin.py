from django.contrib import admin
from adminsortable2.admin import SortableTabularInline, SortableAdminBase  # type: ignore
from .models import Component, Recipe, RecipeComponent, Task, Project


@admin.register(Component)
class ComponentAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


class RecipeComponentInline(SortableTabularInline):
    model = RecipeComponent
    extra = 1 

@admin.register(Recipe)
class RecipeAdmin(SortableAdminBase, admin.ModelAdmin):
    inlines = [RecipeComponentInline]
    save_as = True


admin.site.register(Task)
admin.site.register(Project)
admin.site.register(RecipeComponent)
