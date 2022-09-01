export const packagexml = (package_name:string,msg_class:string[]): string => {

    return`
    <?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>${package_name}</name>
  <version>0.0.0</version>
  <description>TODO: Package description</description>
  <maintainer email="fran@todo.todo">fran</maintainer>
  <license>TODO: License declaration</license>

${msg_class.map((msg) => {
    return `  <depend>"${msg}"</depend>`;
}).join("\n")}

  <test_depend>ament_copyright</test_depend>
  <test_depend>ament_flake8</test_depend>
  <test_depend>ament_pep257</test_depend>
  <test_depend>python3-pytest</test_depend>

  <export>
    <build_type>ament_python</build_type>
  </export>
</package>
    `
}