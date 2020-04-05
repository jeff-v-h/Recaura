using NJsonSchema;
using System.Text.RegularExpressions;

namespace Dawn.Web.TypeScriptGeneration
{
    /// <summary>Prefix generated TypeScript interfaces with "I". This class is referenced by name
    /// in nswag.json.</summary>
    public class InterfaceNameGenerator : DefaultTypeNameGenerator
    {
        private static readonly Regex InterfaceRegex = new Regex(@"^I[A-Z]", RegexOptions.Compiled);

        protected override string Generate(JsonSchema schema, string typeNameHint)
        {
            var baseName = base.Generate(schema, typeNameHint);
            // This method seems to be called more than once per type, so the below check prevents
            // multiple "I"s from being prefixed. It also prevents enums being prefixed at all.
            return schema.IsEnumeration || InterfaceRegex.IsMatch(baseName) ? baseName : $"I{baseName}";
        }
    }
}
