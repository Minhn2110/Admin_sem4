export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
				},

				// {
				// 	title: 'Authentication',
				// 	root: true,
				// 	alignment: 'left',
				// 	toggle: 'click',
				// 	submenu: [
				// 		{
				// 			title: 'User Management',
				// 			bullet: 'dot',
				// 			icon: 'flaticon-user',
				// 			submenu: [
				// 				{
				// 					title: 'Users',
				// 					page: '/user-management/users'
				// 				},
				// 				{
				// 					title: 'Roles',
				// 					page: '/user-management/roles'
				// 				},
				// 				{
				// 					title: 'Menus',
				// 					page: '/user-management/menus'
				// 				}
				// 			]
				// 		}, 
				// 	]
				// },
				{
					title: 'Customer',
					root: true,
					alignment: 'left',
					page: '/customer',
				},
				{
					title: 'Partner',
					root: true,
					alignment: 'left',
					page: '/partner',
				},
				{
					title: 'Product',
					root: true,
					alignment: 'left',
					page: '/product',
				},
				{
					title: 'Transaction History',
					root: true,
					alignment: 'left',
					page: '/transaction-history', 
				},
				{
					title: 'Contract',
					root: true,
					alignment: 'left',
					page: '/contract',
				},
				{
					title: 'Car',
					root: true,
					alignment: 'left',
					page: '/car',
				},
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{section: 'Applications'},
				{
					title: 'eCommerce',
					bullet: 'dot',
					icon: 'flaticon2-list-2',
					root: true,
					permission: 'accessToECommerceModule',
					submenu: [
						{
							title: 'Customers',
							page: '/ecommerce/customers'
						},
						{
							title: 'Products',
							page: '/ecommerce/products'
						},
					]
				},
				{
					title: 'User Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-user-outline-symbol',
					submenu: [
						{
							title: 'Users',
							page: '/user-management/users'
						},
						{
							title: 'Roles',
							page: '/user-management/roles'
						}
					]
				},
				{section: 'Custom'},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
