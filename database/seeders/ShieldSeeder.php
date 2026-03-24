<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use BezhanSalleh\FilamentShield\Support\Utils;
use Spatie\Permission\PermissionRegistrar;

class ShieldSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $rolesWithPermissions = '[{"name":"super_admin","guard_name":"web","permissions":["view_category","view_any_category","create_category","update_category","restore_category","restore_any_category","replicate_category","reorder_category","delete_category","delete_any_category","force_delete_category","force_delete_any_category","view_contact","view_any_contact","create_contact","update_contact","restore_contact","restore_any_contact","replicate_contact","reorder_contact","delete_contact","delete_any_contact","force_delete_contact","force_delete_any_contact","view_course::item","view_any_course::item","create_course::item","update_course::item","restore_course::item","restore_any_course::item","replicate_course::item","reorder_course::item","delete_course::item","delete_any_course::item","force_delete_course::item","force_delete_any_course::item","view_event","view_any_event","create_event","update_event","restore_event","restore_any_event","replicate_event","reorder_event","delete_event","delete_any_event","force_delete_event","force_delete_any_event","view_free::document","view_any_free::document","create_free::document","update_free::document","restore_free::document","restore_any_free::document","replicate_free::document","reorder_free::document","delete_free::document","delete_any_free::document","force_delete_free::document","force_delete_any_free::document","view_header","view_any_header","create_header","update_header","restore_header","restore_any_header","replicate_header","reorder_header","delete_header","delete_any_header","force_delete_header","force_delete_any_header","view_menu","view_any_menu","create_menu","update_menu","restore_menu","restore_any_menu","replicate_menu","reorder_menu","delete_menu","delete_any_menu","force_delete_menu","force_delete_any_menu","view_payment","view_any_payment","create_payment","update_payment","restore_payment","restore_any_payment","replicate_payment","reorder_payment","delete_payment","delete_any_payment","force_delete_payment","force_delete_any_payment","view_promotion","view_any_promotion","create_promotion","update_promotion","restore_promotion","restore_any_promotion","replicate_promotion","reorder_promotion","delete_promotion","delete_any_promotion","force_delete_promotion","force_delete_any_promotion","view_user","view_any_user","create_user","update_user","restore_user","restore_any_user","replicate_user","reorder_user","delete_user","delete_any_user","force_delete_user","force_delete_any_user","view_video::course::item","view_any_video::course::item","create_video::course::item","update_video::course::item","restore_video::course::item","restore_any_video::course::item","replicate_video::course::item","reorder_video::course::item","delete_video::course::item","delete_any_video::course::item","force_delete_video::course::item","force_delete_any_video::course::item"]}]';
        $directPermissions = '[]';

        static::makeRolesWithPermissions($rolesWithPermissions);
        static::makeDirectPermissions($directPermissions);

        $this->command->info('Shield Seeding Completed.');
    }

    protected static function makeRolesWithPermissions(string $rolesWithPermissions): void
    {
        if (! blank($rolePlusPermissions = json_decode($rolesWithPermissions, true))) {
            /** @var Model $roleModel */
            $roleModel = Utils::getRoleModel();
            /** @var Model $permissionModel */
            $permissionModel = Utils::getPermissionModel();

            foreach ($rolePlusPermissions as $rolePlusPermission) {
                $role = $roleModel::firstOrCreate([
                    'name' => $rolePlusPermission['name'],
                    'guard_name' => $rolePlusPermission['guard_name'],
                ]);

                if (! blank($rolePlusPermission['permissions'])) {
                    $permissionModels = collect($rolePlusPermission['permissions'])
                        ->map(fn ($permission) => $permissionModel::firstOrCreate([
                            'name' => $permission,
                            'guard_name' => $rolePlusPermission['guard_name'],
                        ]))
                        ->all();

                    $role->syncPermissions($permissionModels);
                }
            }
        }
    }

    public static function makeDirectPermissions(string $directPermissions): void
    {
        if (! blank($permissions = json_decode($directPermissions, true))) {
            /** @var Model $permissionModel */
            $permissionModel = Utils::getPermissionModel();

            foreach ($permissions as $permission) {
                if ($permissionModel::whereName($permission)->doesntExist()) {
                    $permissionModel::create([
                        'name' => $permission['name'],
                        'guard_name' => $permission['guard_name'],
                    ]);
                }
            }
        }
    }
}
