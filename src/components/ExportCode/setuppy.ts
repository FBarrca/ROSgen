// Function takes in a string and returns a string

export const setupPy = (package_name:string,console_scripts: string): string => {

    return `
    from setuptools import setup

package_name = '${package_name}'

setup(
    name=package_name,
    version='0.0.0',
    packages=[package_name],
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='fran',
    maintainer_email='fran@todo.todo',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            ${console_scripts}
        ],
    },
)

    `;
}

export default setupPy;