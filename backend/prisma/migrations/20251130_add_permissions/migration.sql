-- 用户相关权限
INSERT INTO `Permission` (`code`, `description`) VALUES
('user:create', '创建用户'),
('user:read', '查看用户'),
('user:update', '编辑用户'),
('user:delete', '删除用户'),
('user:list', '查看用户列表');

-- 文章相关权限
INSERT INTO `Permission` (`code`, `description`) VALUES
('post:create', '创建文章'),
('post:read', '查看文章'),
('post:update', '编辑文章'),
('post:delete', '删除文章'),
('post:list', '查看文章列表');

-- 任务相关权限
INSERT INTO `Permission` (`code`, `description`) VALUES
('task:create', '创建任务'),
('task:read', '查看任务'),
('task:update', '编辑任务'),
('task:delete', '删除任务'),
('task:list', '查看任务列表');

-- 角色权限管理
INSERT INTO `Permission` (`code`, `description`) VALUES
('role:create', '创建角色'),
('role:read', '查看角色'),
('role:update', '编辑角色'),
('role:delete', '删除角色'),
('role:manage_permissions', '管理角色权限');

-- 权限管理
INSERT INTO `Permission` (`code`, `description`) VALUES
('permission:create', '创建权限'),
('permission:read', '查看权限'),
('permission:update', '编辑权限'),
('permission:delete', '删除权限');
